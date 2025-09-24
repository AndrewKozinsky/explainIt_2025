/*
  Warnings:

  - You are about to drop the column `sentenceTranslate` on the `BookChapterPhraseExample` table. All the data in the column will be lost.
  - Added the required column `translate` to the `BookChapterPhraseExample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhraseExample" DROP COLUMN "sentenceTranslate",
ADD COLUMN     "translate" TEXT NOT NULL;
