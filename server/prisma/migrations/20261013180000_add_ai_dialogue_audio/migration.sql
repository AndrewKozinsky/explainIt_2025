-- CreateEnum
CREATE TYPE "AiDialogueAudioAttemptStatus" AS ENUM ('active', 'confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "AiDialogueAudioStatus" AS ENUM ('queued', 'generating', 'ready', 'failed', 'outcomeUnknown', 'cancelled');

-- CreateTable
CREATE TABLE "AiDialogueVoice" (
    "id" SERIAL NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "npc_id" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueVoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueAudioAttempt" (
    "id" TEXT NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "turn_id" TEXT NOT NULL,
    "status" "AiDialogueAudioAttemptStatus" NOT NULL DEFAULT 'active',
    "message_ids" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueAudioAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueAudioJob" (
    "id" SERIAL NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "message_id" INTEGER,
    "event_index" INTEGER NOT NULL,
    "action_index" INTEGER NOT NULL,
    "npc_id" TEXT,
    "text" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "s3_key" TEXT NOT NULL,
    "status" "AiDialogueAudioStatus" NOT NULL DEFAULT 'queued',
    "published_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueAudioJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueVoice_dialogue_id_npc_id_key" ON "AiDialogueVoice"("dialogue_id", "npc_id");

-- CreateIndex
CREATE INDEX "AiDialogueAudioAttempt_dialogue_id_created_at_idx" ON "AiDialogueAudioAttempt"("dialogue_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudioJob_s3_key_key" ON "AiDialogueAudioJob"("s3_key");

-- CreateIndex
CREATE INDEX "AiDialogueAudioJob_published_at_status_idx" ON "AiDialogueAudioJob"("published_at", "status");

-- CreateIndex
CREATE INDEX "AiDialogueAudioJob_message_id_idx" ON "AiDialogueAudioJob"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudioJob_attempt_id_event_index_action_index_key" ON "AiDialogueAudioJob"("attempt_id", "event_index", "action_index");

-- AddForeignKey
ALTER TABLE "AiDialogueVoice" ADD CONSTRAINT "AiDialogueVoice_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueAudioAttempt" ADD CONSTRAINT "AiDialogueAudioAttempt_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueAudioJob" ADD CONSTRAINT "AiDialogueAudioJob_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "AiDialogueAudioAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueAudioJob" ADD CONSTRAINT "AiDialogueAudioJob_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Protocol invariants for separate scene descriptions and NPC speeches.
ALTER TABLE "AiDialogueAudioJob" ADD CONSTRAINT "AiDialogueAudioJob_position_check"
CHECK ("event_index" >= 0 AND (("action_index" = -1 AND "npc_id" IS NULL) OR ("action_index" >= 0 AND "npc_id" IS NOT NULL)));
