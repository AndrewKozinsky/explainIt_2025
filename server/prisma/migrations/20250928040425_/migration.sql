/*
  Warnings:

  - You are about to drop the column `translate` on the `BookChapterPhraseExample` table. All the data in the column will be lost.
  - Added the required column `translation` to the `BookChapterPhraseExample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhraseExample" DROP COLUMN "translate",
ADD COLUMN     "translation" TEXT NOT NULL;
