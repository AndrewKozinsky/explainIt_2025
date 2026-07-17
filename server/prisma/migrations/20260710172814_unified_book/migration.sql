/*
  Warnings:

  - You are about to drop the column `book_public_id` on the `BookChapter` table. All the data in the column will be lost.
  - You are about to drop the column `book_private_id` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `book_public_id` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the `BookPrivate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookPublic` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `book_id` on table `BookChapter` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('public', 'private');

-- DropForeignKey
ALTER TABLE "BookChapter" DROP CONSTRAINT "BookChapter_book_id_fkey";

-- DropForeignKey
ALTER TABLE "BookChapter" DROP CONSTRAINT "BookChapter_book_public_id_fkey";

-- DropForeignKey
ALTER TABLE "BookPrivate" DROP CONSTRAINT "BookPrivate_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_book_private_id_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_book_public_id_fkey";

-- AlterTable
ALTER TABLE "BookChapter" DROP COLUMN "book_public_id",
ALTER COLUMN "book_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "book_private_id",
DROP COLUMN "book_public_id",
ADD COLUMN     "book_id" INTEGER;

-- DropTable
DROP TABLE "BookPrivate";

-- DropTable
DROP TABLE "BookPublic";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "type" "BookType" NOT NULL,
    "user_id" INTEGER,
    "author" TEXT,
    "name" TEXT,
    "source_language_code" "LanguageCode" NOT NULL,
    "note" TEXT,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "s3_provider_name" "S3ProviderName",
    "is_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapter" ADD CONSTRAINT "BookChapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
