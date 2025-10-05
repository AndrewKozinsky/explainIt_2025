/*
  Warnings:

  - Added the required column `sentenceId` to the `BookChapterPhrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" ADD COLUMN     "sentenceId" INTEGER NOT NULL;
