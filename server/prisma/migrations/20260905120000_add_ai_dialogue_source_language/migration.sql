-- AlterTable
ALTER TABLE "AiDialogue" ADD COLUMN "source_language_code" "LanguageCode" NOT NULL;

-- AlterTable
ALTER TABLE "AiDialogueScenario" DROP COLUMN "language_code";
