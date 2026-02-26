from __future__ import annotations

import os
from typing import List

from dotenv import load_dotenv
from openai import OpenAI, OpenAIError


load_dotenv()


def _get_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set in environment or .env file.")
    return OpenAI(api_key=api_key)


PROMPT_TEMPLATE = """You are a professional resume optimization assistant.

Improve the following resume to be ATS friendly.
- Use strong action verbs.
- Quantify achievements where possible.
- Include these missing keywords naturally (without keyword stuffing): {missing_keywords}
- Keep formatting professional and concise.
- Do not fabricate fake experiences or skills.
- Keep the text suitable for ATS parsing (avoid tables, graphics, or complex layouts).

Resume:
\"\"\"{resume_text}\"\"\"

Job Description:
\"\"\"{job_description}\"\"\"
"""


def optimize_resume_with_llm(resume_text: str, job_description: str, missing_keywords: List[str]) -> str:
    client = _get_client()
    missing_str = ", ".join(sorted({k.strip() for k in missing_keywords if k.strip()}))
    prompt = PROMPT_TEMPLATE.format(
        resume_text=resume_text.strip(),
        job_description=job_description.strip(),
        missing_keywords=missing_str or "None explicitly specified",
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert resume optimization assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.5,
        )
    except OpenAIError as exc:
        raise RuntimeError(f"LLM optimization failed: {exc}") from exc

    content = response.choices[0].message.content if response.choices else ""
    if not content:
        raise RuntimeError("LLM returned an empty response while optimizing resume.")
    return content.strip()

