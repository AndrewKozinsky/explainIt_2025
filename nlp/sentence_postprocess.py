"""Post-processing for sentence boundaries returned by spaCy.

Statistical sentence segmenters (notably ``fr_core_news_sm`` on classic
French prose with ``« »`` dialogue and hard-wrapped lines) sometimes
over-split text. We apply two conservative merge rules on top of the
raw spans returned by spaCy.

The post-processor works on ``(start_char, end_char)`` offsets in the
original text and returns the merged sentence strings sliced from that
text. Slicing (rather than rejoining tokens with our own spaces)
guarantees that each returned sentence is a byte-for-byte substring of
the input — which the TypeScript caller relies on to recover offsets
via ``indexOf``.
"""

from __future__ import annotations

from typing import Iterable, Sequence


# Sentence-final punctuation, including CJK fullwidth variants.
SENTENCE_END_CHARS: frozenset[str] = frozenset(
    {".", "!", "?", "…", "。", "！", "？"}
)

# Characters that may legitimately appear AFTER a terminator
# (closing quotes, brackets, etc.) and should be ignored when checking
# whether a fragment ends with a terminator.
TRAILING_WRAPPERS: frozenset[str] = frozenset(
    {'"', "'", "»", "”", "’", "›", ")", "]", "}"}
)


def _has_letter(s: str) -> bool:
    return any(c.isalpha() for c in s)


def _ends_with_terminator(s: str) -> bool:
    s = s.rstrip()
    while s and s[-1] in TRAILING_WRAPPERS:
        s = s[:-1].rstrip()
    if not s:
        return False
    return s[-1] in SENTENCE_END_CHARS


def _trim_span(text: str, start: int, end: int) -> tuple[int, int]:
    """Strip leading/trailing whitespace from a (start, end) slice."""
    while start < end and text[start].isspace():
        start += 1
    while end > start and text[end - 1].isspace():
        end -= 1
    return start, end


def merge_sentence_spans(text: str, spans: Iterable[tuple[int, int]]) -> list[str]:
    """Merge over-split sentence fragments and return the final sentences.

    Two rules, applied while walking the list of spans:

    1. A fragment that contains no letters (i.e. only punctuation /
       whitespace, e.g. a stray ``«`` or ``»``) is glued to the previous
       non-empty fragment.
    2. A fragment whose previous neighbor does NOT end with a terminator
       (``.`` ``!`` ``?`` ``…``, optionally followed by closing
       quotes/brackets) is glued to that neighbor. This fixes
       mid-sentence breaks that statistical models occasionally produce
       on hard-wrapped literary text.
    """
    merged: list[list[int]] = []  # each entry: [start, end]

    for raw_start, raw_end in spans:
        start, end = _trim_span(text, raw_start, raw_end)
        if start >= end:
            continue

        fragment = text[start:end]

        if not _has_letter(fragment):
            if merged:
                merged[-1][1] = end
            else:
                merged.append([start, end])
            continue

        if merged and not _ends_with_terminator(text[merged[-1][0]:merged[-1][1]]):
            merged[-1][1] = end
        else:
            merged.append([start, end])

    return [text[s:e] for s, e in merged]


def split_into_sentences(text: str, doc_sents: Sequence) -> list[str]:
    """Convenience wrapper: take a spaCy ``doc.sents`` iterable and apply
    the post-processor. Kept here so ``main.py`` doesn't need to know
    about spaCy's Span attribute names.
    """
    spans = [(sent.start_char, sent.end_char) for sent in doc_sents]
    return merge_sentence_spans(text, spans)
