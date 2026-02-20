/*
  Warnings:

  - You are about to drop the column `covers` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "covers";

-- AlterTable
ALTER TABLE "VideoPublic" ADD COLUMN     "covers" TEXT[];
