/*
  Warnings:

  - You are about to drop the column `subtitles_generation_error` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `subtitles_generation_job_id` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `subtitles_generation_started_at` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `subtitles_generation_status` on the `Video` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SubtitlesSource" AS ENUM ('user', 'youTube', 'llm');

-- CreateEnum
CREATE TYPE "SubtitlesStatus" AS ENUM ('idle', 'pending', 'processing', 'done', 'failed');

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "subtitles_generation_error",
DROP COLUMN "subtitles_generation_job_id",
DROP COLUMN "subtitles_generation_started_at",
DROP COLUMN "subtitles_generation_status",
ADD COLUMN     "subtitles_error_code" TEXT,
ADD COLUMN     "subtitles_job_id" TEXT,
ADD COLUMN     "subtitles_source" "SubtitlesSource" NOT NULL DEFAULT 'user',
ADD COLUMN     "subtitles_status" "SubtitlesStatus" NOT NULL DEFAULT 'idle';

-- DropEnum
DROP TYPE "SubtitlesGenerationStatus";
