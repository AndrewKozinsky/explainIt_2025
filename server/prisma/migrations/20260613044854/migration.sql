-- CreateEnum
CREATE TYPE "UniversalPhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

-- CreateTable
CREATE TABLE "UniversalPhraseTranslation" (
    "id" SERIAL NOT NULL,
    "universal_phrase_id" INTEGER NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "translation" TEXT,
    "status" "UniversalPhraseTranslationStatus" NOT NULL DEFAULT 'pending',
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalPhraseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UniversalPhraseTranslation_universal_phrase_id_idx" ON "UniversalPhraseTranslation"("universal_phrase_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalPhraseTranslation_universal_phrase_id_target_langu_key" ON "UniversalPhraseTranslation"("universal_phrase_id", "target_language_code");

-- AddForeignKey
ALTER TABLE "UniversalPhraseTranslation" ADD CONSTRAINT "UniversalPhraseTranslation_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
