-- DropForeignKey
ALTER TABLE "AiDialogueCharacter" DROP CONSTRAINT "AiDialogueCharacter_dialogue_id_fkey";

-- DropForeignKey
ALTER TABLE "AiDialogueImage" DROP CONSTRAINT "AiDialogueImage_character_id_fkey";

-- DropForeignKey
ALTER TABLE "AiDialogueImage" DROP CONSTRAINT "AiDialogueImage_message_id_fkey";

-- DropForeignKey
ALTER TABLE "AiDialogueMessage" DROP CONSTRAINT "AiDialogueMessage_character_id_fkey";

-- DropForeignKey
ALTER TABLE "ImageGenerationJob" DROP CONSTRAINT "ImageGenerationJob_character_id_fkey";

-- DropForeignKey
ALTER TABLE "ImageGenerationJob" DROP CONSTRAINT "ImageGenerationJob_message_id_fkey";

-- DropForeignKey
ALTER TABLE "ImageGenerationOutbox" DROP CONSTRAINT "ImageGenerationOutbox_job_id_fkey";

-- AddForeignKey
ALTER TABLE "AiDialogueMessage" ADD CONSTRAINT "AiDialogueMessage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueCharacter" ADD CONSTRAINT "AiDialogueCharacter_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueImage" ADD CONSTRAINT "AiDialogueImage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueImage" ADD CONSTRAINT "AiDialogueImage_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationJob" ADD CONSTRAINT "ImageGenerationJob_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationJob" ADD CONSTRAINT "ImageGenerationJob_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationOutbox" ADD CONSTRAINT "ImageGenerationOutbox_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "ImageGenerationJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;
