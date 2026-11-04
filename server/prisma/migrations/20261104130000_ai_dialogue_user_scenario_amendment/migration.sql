-- User wishes for the scene, set when the dialogue is created.
ALTER TABLE "AiDialogue" ADD COLUMN "user_scenario_amendment" TEXT;

-- Localized placeholder example for the wishes field; the startup seed fills in the translations.
ALTER TABLE "AiDialogueScenario" ADD COLUMN "user_scenario_amendment_hint" TEXT;
