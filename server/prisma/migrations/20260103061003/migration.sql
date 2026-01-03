/*
  Warnings:

  - You are about to drop the column `subtitles` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "subtitles",
ADD COLUMN     "text" TEXT;
