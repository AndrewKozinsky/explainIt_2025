-- CreateEnum
CREATE TYPE "WordSenseImageStatus" AS ENUM ('none', 'pending', 'generating', 'ready', 'failed');

-- Старые статьи построены по прежней схеме блоков и пересоздаются при следующем открытии.
DELETE FROM "UniversalPhraseTranslation";

-- AlterTable
ALTER TABLE "UniversalPhraseTranslation" ADD COLUMN     "deep_sections" TEXT,
ADD COLUMN     "lemmas" TEXT;

-- CreateTable
CREATE TABLE "WordSense" (
    "id" SERIAL NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "lemma" TEXT NOT NULL,
    "gloss" TEXT NOT NULL,
    "visual_kind" TEXT,
    "visual_aspect" TEXT,
    "visual_prompt" TEXT,
    "image_s3_key" TEXT,
    "image_status" "WordSenseImageStatus" NOT NULL DEFAULT 'none',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WordSense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WordSense_source_language_code_lemma_idx" ON "WordSense"("source_language_code", "lemma");

-- CreateIndex
CREATE UNIQUE INDEX "WordSense_source_language_code_lemma_gloss_key" ON "WordSense"("source_language_code", "lemma", "gloss");
