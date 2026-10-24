-- CreateIndex
CREATE INDEX "AiDialogue_user_id_created_at_id_idx" ON "AiDialogue"("user_id", "created_at", "id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_id_idx" ON "AiDialogueMessage"("dialogue_id", "id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_type_id_idx" ON "AiDialogueMessage"("dialogue_id", "type", "id");
