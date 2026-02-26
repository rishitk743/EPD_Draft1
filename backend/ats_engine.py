from __future__ import annotations

from typing import List, Set, Tuple

from .parser import extract_keywords


def compute_ats_score(resume_text: str, job_description: str) -> Tuple[float, List[str], List[str]]:
    jd_keywords = set(extract_keywords(job_description))
    resume_keywords = set(extract_keywords(resume_text))

    if not jd_keywords:
        return 0.0, [], []

    matched = sorted(jd_keywords.intersection(resume_keywords))
    missing = sorted(jd_keywords.difference(resume_keywords))
    score = (len(matched) / len(jd_keywords)) * 100.0
    return round(score, 2), matched, missing


def normalize_keyword_set(keywords: List[str]) -> Set[str]:
    return {k.strip().lower() for k in keywords if k.strip()}

