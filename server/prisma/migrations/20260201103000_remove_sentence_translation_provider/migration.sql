-- Drop provider-related index first (created in 20260127101710)
DROP INDEX IF EXISTS "SentenceTranslation_provider_idx";

-- Drop provider column (it was NOT NULL and causes inserts to fail after provider removal from schema)
ALTER TABLE "SentenceTranslation" DROP COLUMN IF EXISTS "provider";

-- Drop enum type if it exists
DROP TYPE IF EXISTS "SentenceTranslationProvider";
