from typing import List, Optional

from pydantic import BaseModel, Field


class UploadResumeResponse(BaseModel):
    resume_text: str = Field(..., description="Extracted plain text from the resume")
    keywords: List[str] = Field(..., description="Keywords extracted from the resume text")


class AnalyzeRequest(BaseModel):
    resume_text: str = Field(..., min_length=1, description="Plain text content of the resume")
    job_description: str = Field(..., min_length=1, description="Plain text job description")


class AnalyzeResponse(BaseModel):
    ats_score: float = Field(..., ge=0, le=100, description="ATS compatibility score (0-100)")
    matched_keywords: List[str] = Field(..., description="Keywords present in both resume and job description")
    missing_keywords: List[str] = Field(..., description="Keywords present in JD but missing from resume")


class OptimizeRequest(BaseModel):
    resume_text: str = Field(..., min_length=1, description="Original resume text")
    job_description: str = Field(..., min_length=1, description="Target job description")
    missing_keywords: List[str] = Field(..., description="Missing keywords to weave into the resume text")


class OptimizeResponse(BaseModel):
    optimized_resume: str = Field(..., description="Improved, ATS-friendly resume text")


class GenerateRequest(BaseModel):
    optimized_resume: str = Field(..., min_length=1, description="Optimized resume text to convert into DOCX")

