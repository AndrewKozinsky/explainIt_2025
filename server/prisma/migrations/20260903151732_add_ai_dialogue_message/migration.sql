-- CreateEnum
CREATE TYPE "AiDialogueMessageType" AS ENUM ('sceneUpdate', 'help', 'npcActions', 'userActions', 'userAvoidsNPC', 'worldEvent');

-- AlterTable
ALTER TABLE "AiDialogue" ADD COLUMN     "summary" TEXT,
ADD COLUMN     "summary_up_to" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "AiDialogueMessage" (
    "id" SERIAL NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "type" "AiDialogueMessageType" NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_idx" ON "AiDialogueMessage"("dialogue_id");

-- AddForeignKey
ALTER TABLE "AiDialogueMessage" ADD CONSTRAINT "AiDialogueMessage_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
