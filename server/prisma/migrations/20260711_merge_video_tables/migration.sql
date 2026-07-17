/*
  Warnings:

  - You are about to drop the column `video_private_id` on the `Sentence` table. All the data in the column will be lost.
  - You are about to drop the column `video_public_id` on the `Sentence` table. All the data in the column will be lost.
  - You are about to drop the column `video_private_id` on the `Subtitle` table. All the data in the column will be lost.
  - You are about to drop the column `video_public_id` on the `Subtitle` table. All the data in the column will be lost.
  - You are about to drop the column `video_private_id` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `video_public_id` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the `VideoPrivate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoPublic` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('public', 'private');

-- DropForeignKey (VideoPrivate -> User)
ALTER TABLE "VideoPrivate" DROP CONSTRAINT "VideoPrivate_user_id_fkey";

-- DropForeignKey (Sentence -> VideoPrivate, VideoPublic)
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_video_private_id_fkey";
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_video_public_id_fkey";

-- DropForeignKey (Subtitle -> VideoPrivate, VideoPublic)
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_video_private_id_fkey";
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_video_public_id_fkey";

-- DropForeignKey (Flashcard -> VideoPrivate, VideoPublic)
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_video_private_id_fkey";
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_video_public_id_fkey";

-- DropTable
DROP TABLE "VideoPrivate";
DROP TABLE "VideoPublic";

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "type" "VideoType" NOT NULL,
    "user_id" INTEGER,
    "source_language_code" "LanguageCode" NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "s3_provider_name" "S3ProviderName",
    "is_file_uploaded" BOOLEAN DEFAULT false,
    "file_size_mb" INTEGER NOT NULL DEFAULT 0,
    "file_duration_sec" INTEGER,
    "cover_file_name" TEXT,
    "cover_file_s3_key" TEXT,
    "cover_file_s3_provider_name" "S3ProviderName",
    "is_cover_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoTextType" NOT NULL DEFAULT 'text',
    "subtitles_generation_status" "SubtitlesGenerationStatus" NOT NULL DEFAULT 'idle',
    "subtitles_generation_error" TEXT,
    "subtitles_generation_started_at" TIMESTAMP(3),
    "subtitles_generation_job_id" TEXT,
    "subtitles_generation_charge_kopecks" INTEGER,
    "subtitles_generation_refunded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AlterTable (Sentence: drop old columns, add new video_id)
ALTER TABLE "Sentence" DROP COLUMN "video_private_id",
DROP COLUMN "video_public_id",
ADD COLUMN "video_id" INTEGER;

-- AlterTable (Subtitle: drop old columns, add new video_id)
ALTER TABLE "Subtitle" DROP COLUMN "video_private_id",
DROP COLUMN "video_public_id",
ADD COLUMN "video_id" INTEGER;

-- AlterTable (Flashcard: drop old columns, add new video_id)
ALTER TABLE "Flashcard" DROP COLUMN "video_private_id",
DROP COLUMN "video_public_id",
ADD COLUMN "video_id" INTEGER;

-- AddForeignKey (Video -> User)
ALTER TABLE "Video" ADD CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey (Sentence -> Video)
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey (Subtitle -> Video)
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey (Flashcard -> Video)
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
