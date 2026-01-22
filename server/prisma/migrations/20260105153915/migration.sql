/*
  Warnings:

  - You are about to drop the column `text_populated` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "text_populated",
ADD COLUMN     "text_resolved" TEXT;
