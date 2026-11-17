ALTER TABLE "AiDialogueMessage" ADD COLUMN "request_id" TEXT;

CREATE UNIQUE INDEX "AiDialogueMessage_dialogue_id_request_id_key"
ON "AiDialogueMessage"("dialogue_id", "request_id");
