FROM python:3.15-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy models for all trained languages we support.
# Keep this list in sync with TRAINED_MODELS in pipelines.py.
RUN python -m spacy download en_core_web_sm \
    && python -m spacy download es_core_news_sm \
    && python -m spacy download fr_core_news_sm \
    && python -m spacy download de_core_news_sm \
    && python -m spacy download ru_core_news_sm \
    && python -m spacy download it_core_news_sm \
    && python -m spacy download pt_core_news_sm

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]