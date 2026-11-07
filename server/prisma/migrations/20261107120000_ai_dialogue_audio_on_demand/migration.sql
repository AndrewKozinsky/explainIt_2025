-- Озвучка диалогов теперь создаётся по запросу клиента. Старые попытки и задания удаляются вместе с данными.

-- DropTable
DROP TABLE "AiDialogueAudioJob";

-- DropTable
DROP TABLE "AiDialogueAudioAttempt";

-- DropEnum
DROP TYPE "AiDialogueAudioAttemptStatus";

-- DropEnum
DROP TYPE "AiDialogueAudioStatus";

-- CreateEnum
CREATE TYPE "AiDialogueAudioStatus" AS ENUM ('generating', 'ready', 'failed');

-- CreateTable
CREATE TABLE "AiDialogueAudio" (
    "id" SERIAL NOT NULL,
    "message_id" INTEGER NOT NULL,
    "action_index" INTEGER NOT NULL,
    "s3_key" TEXT NOT NULL,
    "status" "AiDialogueAudioStatus" NOT NULL DEFAULT 'generating',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueAudio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudio_s3_key_key" ON "AiDialogueAudio"("s3_key");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudio_message_id_action_index_key" ON "AiDialogueAudio"("message_id", "action_index");

-- AddForeignKey
ALTER TABLE "AiDialogueAudio" ADD CONSTRAINT "AiDialogueAudio_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
