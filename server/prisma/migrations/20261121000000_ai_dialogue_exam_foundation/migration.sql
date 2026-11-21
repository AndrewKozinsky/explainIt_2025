-- Preserve existing practice dialogues while introducing independent exam attempts.
ALTER TYPE "CefrSimplificationLevel" RENAME TO "AiDialogueCefrLevel";
ALTER TYPE "AiDialogueCefrLevel" ADD VALUE 'C1';

CREATE TYPE "AiDialogueMode" AS ENUM ('practice', 'exam');
ALTER TABLE "AiDialogue" RENAME COLUMN "max_cefr_level" TO "cefr_level";
ALTER TABLE "AiDialogue" ADD COLUMN "mode" "AiDialogueMode" NOT NULL DEFAULT 'practice';

ALTER TABLE "AiDialogueScenario" ADD COLUMN "medal_s3_keys" TEXT;
ALTER TYPE "AiDialogueMessageType" ADD VALUE 'examResult';
