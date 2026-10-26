-- Existing dialogues retain the original illustration style.
-- New API-created dialogues explicitly store a style ID from the catalog.
ALTER TABLE "AiDialogue" ADD COLUMN "illustration_style_id" TEXT NOT NULL DEFAULT 'legacy';
