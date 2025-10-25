import spacy

nlp = spacy.load("en_core_web_sm")

def match_resume(resume_text, job_desc):
    resume_doc = nlp(resume_text.lower())
    job_doc = nlp(job_desc.lower())

    resume_tokens = {token.lemma_ for token in resume_doc if token.is_alpha and not token.is_stop}
    job_tokens = {token.lemma_ for token in job_doc if token.is_alpha and not token.is_stop}

    matched = resume_tokens.intersection(job_tokens)
    score = round(len(matched) / len(job_tokens) * 100, 2) if job_tokens else 0.0

    return score, list(matched)
