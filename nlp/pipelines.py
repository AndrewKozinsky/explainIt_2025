"""spaCy pipeline configuration and lazy loader.

The app supports two flavors of pipelines per language:

- TRAINED_MODELS: full small spaCy models with a statistical parser/senter
  for high-quality sentence boundaries (English, German, French, etc.).
- BLANK_LANGUAGES: blank pipelines plus the rule-based "sentencizer"
  component. Used for CJK + Arabic + Turkish, whose trained pipelines
  require heavy native dependencies (mecab-ko, sudachipy, jieba) and
  whose sentence segmentation is largely punctuation-driven anyway.

Pipelines are loaded lazily on first request and then cached for the
lifetime of the process.
"""

from __future__ import annotations

import spacy


TRAINED_MODELS: dict[str, str] = {
    "en": "en_core_web_sm",
    "es": "es_core_news_sm",
    "fr": "fr_core_news_sm",
    "de": "de_core_news_sm",
    "ru": "ru_core_news_sm",
    "it": "it_core_news_sm",
    "pt": "pt_core_news_sm",
}

BLANK_LANGUAGES: dict[str, str] = {
    "ar": "ar",
    "tr": "tr",
    "ja": "ja",
    "ko": "ko",
    "zhCMN": "zh",
}

SUPPORTED_LANGUAGES: set[str] = set(TRAINED_MODELS) | set(BLANK_LANGUAGES)


class UnsupportedLanguageError(ValueError):
    """Raised when a language outside SUPPORTED_LANGUAGES is requested."""


_loaded_pipelines: dict[str, spacy.language.Language] = {}


def get_pipeline(language: str) -> spacy.language.Language:
    """Return a (cached) spaCy pipeline for the given app language code."""
    if language in _loaded_pipelines:
        return _loaded_pipelines[language]

    if language in TRAINED_MODELS:
        nlp = spacy.load(TRAINED_MODELS[language])
    elif language in BLANK_LANGUAGES:
        nlp = spacy.blank(BLANK_LANGUAGES[language])
        nlp.add_pipe("sentencizer")
    else:
        raise UnsupportedLanguageError(
            f"Unsupported language '{language}'. Supported: {sorted(SUPPORTED_LANGUAGES)}"
        )

    # Defensive fallback: ensure something produces sentence boundaries.
    if not (nlp.has_pipe("parser") or nlp.has_pipe("senter") or nlp.has_pipe("sentencizer")):
        nlp.add_pipe("sentencizer")

    _loaded_pipelines[language] = nlp
    return nlp
