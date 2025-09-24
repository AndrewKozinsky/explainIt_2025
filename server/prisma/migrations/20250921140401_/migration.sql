/*
  Warnings:

  - You are about to drop the column `phraseExplanation` on the `BookChapterPhrase` table. All the data in the column will be lost.
  - Added the required column `phraseAnalysis` to the `BookChapterPhrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" DROP COLUMN "phraseExplanation",
ADD COLUMN     "phraseAnalysis" TEXT NOT NULL;
