/*
  Warnings:

  - You are about to drop the column `text` on the `VideoPrivate` table. All the data in the column will be lost.
  - You are about to drop the column `text_resolved` on the `VideoPrivate` table. All the data in the column will be lost.
  - You are about to drop the `BookChapterPhrase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookChapterPhraseExample` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookChapterPhrase" DROP CONSTRAINT "BookChapterPhrase_book_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "BookChapterPhraseExample" DROP CONSTRAINT "BookChapterPhraseExample_book_chapter_phrase_id_fkey";

-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "text",
DROP COLUMN "text_resolved",
ADD COLUMN     "content" TEXT;

-- DropTable
DROP TABLE "BookChapterPhrase";

-- DropTable
DROP TABLE "BookChapterPhraseExample";
