BEGIN;

-- Display order comes from the seed (index in getScenariosData) instead of created_at.
ALTER TABLE "AiDialogueScenarioGroup" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "AiDialogueScenario" ADD COLUMN "position" INTEGER NOT NULL DEFAULT 0;

DROP INDEX "AiDialogueScenarioGroup_created_at_id_idx";
CREATE INDEX "AiDialogueScenarioGroup_position_id_idx" ON "AiDialogueScenarioGroup"("position", "id");
DROP INDEX "AiDialogueScenario_group_id_created_at_id_idx";
CREATE INDEX "AiDialogueScenario_group_id_position_id_idx" ON "AiDialogueScenario"("group_id", "position", "id");

-- Texts shown only to the user: ideas of how to steer the conversation and what the scenario trains.
ALTER TABLE "AiDialogueScenario" ADD COLUMN "conversation_ideas" TEXT;
ALTER TABLE "AiDialogueScenario" ADD COLUMN "trained_skills" TEXT;

-- Existing public scenarios get empty JSON placeholders; the startup seed fills in the translations.
UPDATE "AiDialogueScenario" SET "conversation_ideas" = '{}', "trained_skills" = '{}' WHERE "user_id" IS NULL;

ALTER TABLE "AiDialogueScenario" DROP CONSTRAINT "AiDialogueScenario_public_group_cover_check";
ALTER TABLE "AiDialogueScenario"
ADD CONSTRAINT "AiDialogueScenario_public_group_cover_check" CHECK (
    ("user_id" IS NULL
        AND "group_id" IS NOT NULL
        AND "slug" IS NOT NULL AND length(btrim("slug")) > 0
        AND "cover_s3_key" IS NOT NULL AND length(btrim("cover_s3_key")) > 0
        AND "conversation_ideas" IS NOT NULL
        AND "trained_skills" IS NOT NULL)
    OR ("user_id" IS NOT NULL AND "group_id" IS NULL)
);

COMMIT;
