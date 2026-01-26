-- CreateEnum
CREATE TYPE "VideoPrivateContentType" AS ENUM ('text', 'subtitles');

-- AlterTable
ALTER TABLE "VideoPrivate" ADD COLUMN     "content_type" "VideoPrivateContentType" NOT NULL DEFAULT 'text';
