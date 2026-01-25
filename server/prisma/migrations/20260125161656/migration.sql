/*
  Warnings:

  - You are about to drop the column `content` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "content",
ADD COLUMN     "original_content" TEXT,
ADD COLUMN     "processed_content" TEXT;
