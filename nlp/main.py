from fastapi import FastAPI
import spacy

nlp = spacy.load("en_core_web_sm")
app = FastAPI()

@app.post("/sentences")
def split_sentences(payload: dict):
    text = payload["text"]
    doc = nlp(text)

    sentences = [sent.text.strip() for sent in doc.sents]
    return { "sentences": sentences }