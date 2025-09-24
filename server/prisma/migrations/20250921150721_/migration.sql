/*
  Warnings:

  - You are about to drop the column `user_id` on the `BookChapterPhrase` table. All the data in the column will be lost.
  - Added the required column `book_chapter_id` to the `BookChapterPhrase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."BookChapterPhrase" DROP CONSTRAINT "BookChapterPhrase_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" DROP COLUMN "user_id",
ADD COLUMN     "book_chapter_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BookChapterPhrase" ADD CONSTRAINT "BookChapterPhrase_book_chapter_id_fkey" FOREIGN KEY ("book_chapter_id") REFERENCES "public"."BookChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
