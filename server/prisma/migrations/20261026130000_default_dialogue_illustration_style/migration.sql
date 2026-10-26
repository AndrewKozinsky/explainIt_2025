-- Use the first available style for existing dialogues and direct database inserts.
ALTER TABLE "AiDialogue" ALTER COLUMN "illustration_style_id" SET DEFAULT 'realism';
UPDATE "AiDialogue" SET "illustration_style_id" = 'realism' WHERE "illustration_style_id" = 'legacy';
