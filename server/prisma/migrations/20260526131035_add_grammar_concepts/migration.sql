-- CreateEnum
CREATE TYPE "GrammarExtractionStatus" AS ENUM ('NOT_STARTED', 'ERROR', 'SUCCESS');

-- CreateTable
CREATE TABLE "GrammarConcept" (
    "id" TEXT NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "category" TEXT NOT NULL,
    "lemma" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "aliases" TEXT[],

    CONSTRAINT "GrammarConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversalSentence" (
    "id" SERIAL NOT NULL,
    "sentence_text" TEXT NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "status" "GrammarExtractionStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalSentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissingGrammarConcept" (
    "id" SERIAL NOT NULL,
    "universal_sentence_id" INTEGER NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "category" TEXT NOT NULL,
    "lemma" TEXT NOT NULL,
    "sentence_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissingGrammarConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarConceptToUniversalSentence" (
    "id" SERIAL NOT NULL,
    "grammar_concept_id" TEXT NOT NULL,
    "universal_sentence_id" INTEGER NOT NULL,

    CONSTRAINT "GrammarConceptToUniversalSentence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrammarConcept_source_language_code_target_language_code_ca_key" ON "GrammarConcept"("source_language_code", "target_language_code", "category", "lemma");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalSentence_sentence_text_source_language_code_key" ON "UniversalSentence"("sentence_text", "source_language_code");

-- CreateIndex
CREATE INDEX "MissingGrammarConcept_universal_sentence_id_idx" ON "MissingGrammarConcept"("universal_sentence_id");

-- CreateIndex
CREATE INDEX "GrammarConceptToUniversalSentence_grammar_concept_id_idx" ON "GrammarConceptToUniversalSentence"("grammar_concept_id");

-- CreateIndex
CREATE INDEX "GrammarConceptToUniversalSentence_universal_sentence_id_idx" ON "GrammarConceptToUniversalSentence"("universal_sentence_id");

-- CreateIndex
CREATE UNIQUE INDEX "GrammarConceptToUniversalSentence_grammar_concept_id_univer_key" ON "GrammarConceptToUniversalSentence"("grammar_concept_id", "universal_sentence_id");

-- AddForeignKey
ALTER TABLE "MissingGrammarConcept" ADD CONSTRAINT "MissingGrammarConcept_universal_sentence_id_fkey" FOREIGN KEY ("universal_sentence_id") REFERENCES "UniversalSentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarConceptToUniversalSentence" ADD CONSTRAINT "GrammarConceptToUniversalSentence_grammar_concept_id_fkey" FOREIGN KEY ("grammar_concept_id") REFERENCES "GrammarConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarConceptToUniversalSentence" ADD CONSTRAINT "GrammarConceptToUniversalSentence_universal_sentence_id_fkey" FOREIGN KEY ("universal_sentence_id") REFERENCES "UniversalSentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
