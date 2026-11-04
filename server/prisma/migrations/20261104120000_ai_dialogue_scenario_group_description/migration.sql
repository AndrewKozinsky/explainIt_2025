-- Existing groups get an empty description; the startup seed fills in the translations.
ALTER TABLE "AiDialogueScenarioGroup" ADD COLUMN "description" TEXT NOT NULL DEFAULT '';
ALTER TABLE "AiDialogueScenarioGroup" ALTER COLUMN "description" DROP DEFAULT;
