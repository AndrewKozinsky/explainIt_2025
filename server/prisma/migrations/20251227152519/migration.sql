/*
  Warnings:

  - You are about to drop the column `transcription` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "transcription",
ADD COLUMN     "subtitles" TEXT;
