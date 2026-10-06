
CREATE TYPE "AiDialogueImageType" AS ENUM ('emotionSheet', 'angleSheet', 'scene');
CREATE TYPE "ImageGenerationJobType" AS ENUM ('emotionSheet', 'angleSheet', 'scene');
CREATE TYPE "ImageGenerationJobStatus" AS ENUM ('queued', 'waitingDependencies', 'generating', 'ready', 'failed');
CREATE TYPE "ImageGenerationOutboxStatus" AS ENUM ('pending', 'published');

CREATE TABLE "AiDialogueCharacter" (
    "id" SERIAL PRIMARY KEY,
    "dialogue_id" INTEGER NOT NULL REFERENCES "AiDialogue"("id") ON DELETE CASCADE,
    "npc_id" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT,
    "appearance" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiDialogueCharacter_dialogue_id_npc_id_key" UNIQUE ("dialogue_id", "npc_id")
);

ALTER TABLE "AiDialogueMessage" ADD COLUMN "character_id" INTEGER;
ALTER TABLE "AiDialogueMessage" ADD CONSTRAINT "AiDialogueMessage_character_id_fkey"
    FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE SET NULL;
CREATE INDEX "AiDialogueMessage_character_id_idx" ON "AiDialogueMessage"("character_id");

CREATE TABLE "AiDialogueImage" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE,
    "message_id" INTEGER REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE,
    "type" "AiDialogueImageType" NOT NULL,
    "layout_version" TEXT,
    "s3_key" TEXT NOT NULL UNIQUE,
    "mime_type" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiDialogueImage_exactly_one_owner_check" CHECK (
        (("character_id" IS NOT NULL)::int + ("message_id" IS NOT NULL)::int) = 1
    )
);

CREATE TABLE "ImageGenerationJob" (
    "id" SERIAL PRIMARY KEY,
    "dedup_key" TEXT NOT NULL UNIQUE,
    "type" "ImageGenerationJobType" NOT NULL,
    "status" "ImageGenerationJobStatus" NOT NULL DEFAULT 'queued',
    "character_id" INTEGER REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE,
    "message_id" INTEGER REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE,
    "input" TEXT NOT NULL,
    "provider_request_id" TEXT,
    "provider_polling_url" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ImageGenerationJob_exactly_one_target_check" CHECK (
        (("character_id" IS NOT NULL)::int + ("message_id" IS NOT NULL)::int) = 1
    )
);

CREATE TABLE "ImageGenerationOutbox" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INTEGER NOT NULL UNIQUE REFERENCES "ImageGenerationJob"("id") ON DELETE CASCADE,
    "status" "ImageGenerationOutboxStatus" NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "AiDialogueImage_character_id_idx" ON "AiDialogueImage"("character_id");
CREATE INDEX "AiDialogueImage_message_id_idx" ON "AiDialogueImage"("message_id");
CREATE INDEX "ImageGenerationJob_status_idx" ON "ImageGenerationJob"("status");
CREATE INDEX "ImageGenerationOutbox_status_idx" ON "ImageGenerationOutbox"("status");

