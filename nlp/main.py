from fastapi import FastAPI, HTTPException
import spacy

# Mapping from app language code (matches Prisma LanguageCode enum) to a loader.
# - For languages with a trained small spaCy pipeline, we load it lazily.
# - For languages without an official trained pipeline (ar, tr), we use a blank
#   pipeline with the rule-based "sentencizer" component.
TRAINED_MODELS = {
    "en": "en_core_web_sm",
    "es": "es_core_news_sm",
    "fr": "fr_core_news_sm",
    "de": "de_core_news_sm",
    "ru": "ru_core_news_sm",
    "it": "it_core_news_sm",
    "pt": "pt_core_news_sm",
}

# Blank pipelines (rule-based sentencizer only). Key is app language code,
# value is the spaCy language code understood by `spacy.blank`.
# CJK + Arabic + Turkish go here because their trained spaCy pipelines require
# heavy native dependencies (mecab-ko, sudachipy, jieba) and sentence splitting
# for these languages is largely punctuation-driven, where the rule-based
# sentencizer is adequate.
BLANK_LANGUAGES = {
    "ar": "ar",
    "tr": "tr",
    "ja": "ja",
    "ko": "ko",
    "zhCMN": "zh",
}

SUPPORTED_LANGUAGES = set(TRAINED_MODELS.keys()) | set(BLANK_LANGUAGES.keys())

_loaded_pipelines = {}


def get_pipeline(language: str):
    if language in _loaded_pipelines:
        return _loaded_pipelines[language]

    if language in TRAINED_MODELS:
        nlp = spacy.load(TRAINED_MODELS[language])
    elif language in BLANK_LANGUAGES:
        nlp = spacy.blank(BLANK_LANGUAGES[language])
        nlp.add_pipe("sentencizer")
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language '{language}'. Supported: {sorted(SUPPORTED_LANGUAGES)}",
        )

    # Ensure sentence boundaries are produced even if the trained pipeline
    # somehow lacks a parser/senter component.
    if not nlp.has_pipe("parser") and not nlp.has_pipe("senter") and not nlp.has_pipe("sentencizer"):
        nlp.add_pipe("sentencizer")

    _loaded_pipelines[language] = nlp
    return nlp


app = FastAPI()


@app.post("/sentences")
def split_sentences(payload: dict):
    text = payload.get("text")
    language = payload.get("language")

    if text is None:
        raise HTTPException(status_code=400, detail="Field 'text' is required.")
    if not language:
        raise HTTPException(status_code=400, detail="Field 'language' is required.")

    nlp = get_pipeline(language)
    doc = nlp(text)

    sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]
    return {"sentences": sentences}