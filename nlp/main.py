from fastapi import FastAPI, HTTPException

from pipelines import UnsupportedLanguageError, get_pipeline
from sentence_postprocess import split_into_sentences


app = FastAPI()


@app.post("/sentences")
def split_sentences(payload: dict):
    text = payload.get("text")
    language = payload.get("language")

    if text is None:
        raise HTTPException(status_code=400, detail="Field 'text' is required.")
    if not language:
        raise HTTPException(status_code=400, detail="Field 'language' is required.")

    try:
        nlp = get_pipeline(language)
    except UnsupportedLanguageError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    doc = nlp(text)
    sentences = split_into_sentences(text, doc.sents)
    return {"sentences": sentences}