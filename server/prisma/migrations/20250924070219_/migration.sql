/*
  Warnings:

  - Added the required column `sentence` to the `BookChapterPhrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" ADD COLUMN     "sentence" TEXT NOT NULL;
