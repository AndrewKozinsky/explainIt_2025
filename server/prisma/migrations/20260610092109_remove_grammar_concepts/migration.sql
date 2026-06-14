-- DropGrammarConceptTables
DROP TABLE IF EXISTS "GrammarConceptToUniversalPhrase" CASCADE;
DROP TABLE IF EXISTS "MissingGrammarConcept" CASCADE;
DROP TABLE IF EXISTS "GrammarConcept" CASCADE;

-- RemoveGrammarExtractionStatus
ALTER TABLE "UniversalPhrase" DROP COLUMN IF EXISTS "grammarExtractionStatus";

-- DropGrammarExtractionStatusEnum
DROP TYPE IF EXISTS "GrammarExtractionStatus";
