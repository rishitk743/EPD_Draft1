from __future__ import annotations

import os
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR

from . import ats_engine, parser, resume_generator
from .llm_engine import optimize_resume_with_llm
from .models import (
    AnalyzeRequest,
    AnalyzeResponse,
    GenerateRequest,
    OptimizeRequest,
    OptimizeResponse,
    UploadResumeResponse,
)


BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="Smart Resume Builder API",
    description="AI-Powered Smart Resume Builder with ATS Optimization and Job Description Matching",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-resume", response_model=UploadResumeResponse)
async def upload_resume(file: Annotated[UploadFile, File(...)]):
    if not file.filename:
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="No file provided.")

    filename = file.filename.lower()
    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a PDF or DOCX file.",
        )

    try:
        data = await file.read()
        if not data:
            raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

        if filename.endswith(".pdf"):
            resume_text = parser.parse_pdf(data)
        else:
            resume_text = parser.parse_docx(data)

        keywords = parser.extract_keywords(resume_text)
    except RuntimeError as exc:
        raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to parse resume: {exc}",
        ) from exc

    return UploadResumeResponse(resume_text=resume_text, keywords=keywords)


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_resume(payload: AnalyzeRequest):
    try:
        score, matched, missing = ats_engine.compute_ats_score(
            resume_text=payload.resume_text,
            job_description=payload.job_description,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    return AnalyzeResponse(ats_score=score, matched_keywords=matched, missing_keywords=missing)


@app.post("/optimize", response_model=OptimizeResponse)
async def optimize_resume(payload: OptimizeRequest):
    if not payload.resume_text.strip():
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Resume text cannot be empty.")
    if not payload.job_description.strip():
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Job description cannot be empty.")

    try:
        optimized = optimize_resume_with_llm(
            resume_text=payload.resume_text,
            job_description=payload.job_description,
            missing_keywords=payload.missing_keywords,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc

    return OptimizeResponse(optimized_resume=optimized)


@app.post("/generate")
async def generate_resume_file(payload: GenerateRequest):
    if not payload.optimized_resume.strip():
        raise HTTPException(status_code=HTTP_400_BAD_REQUEST, detail="Optimized resume text cannot be empty.")

    try:
        output_path = resume_generator.generate_docx_from_resume_text(
            optimized_resume=payload.optimized_resume,
            output_dir=BASE_DIR,
        )
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate DOCX resume: {exc}",
        ) from exc

    if not os.path.exists(output_path):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate resume file.",
        )

    filename = os.path.basename(output_path)
    return FileResponse(
        output_path,
        media_type=(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ),
        filename=filename,
    )


@app.get("/health")
async def health_check():
    return {"status": "ok"}

