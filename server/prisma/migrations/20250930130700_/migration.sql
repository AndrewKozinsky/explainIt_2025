/*
  Warnings:

  - The `phrase` column on the `BookChapterPhrase` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" DROP COLUMN "phrase",
ADD COLUMN     "phrase" INTEGER[];
