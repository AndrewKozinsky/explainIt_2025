/*
  Warnings:

  - You are about to drop the column `book_sentence_id` on the `Sentence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_book_sentence_id_fkey";

-- AlterTable
ALTER TABLE "Sentence" DROP COLUMN "book_sentence_id",
ADD COLUMN     "book_chapter_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_book_chapter_id_fkey" FOREIGN KEY ("book_chapter_id") REFERENCES "BookChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
