-- CreateEnum
CREATE TYPE "SentenceTranslationProvider" AS ENUM ('yandexTranslate', 'chatGPTNano', 'chatGPTMini', 'chatGPTStandard');

-- CreateTable
CREATE TABLE "SentenceTranslation" (
    "id" SERIAL NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    "provider" "SentenceTranslationProvider" NOT NULL,
    "analysis" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentenceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SentenceTranslation_sentence_id_idx" ON "SentenceTranslation"("sentence_id");

-- CreateIndex
CREATE INDEX "SentenceTranslation_provider_idx" ON "SentenceTranslation"("provider");

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
