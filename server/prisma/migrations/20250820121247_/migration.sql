/*
  Warnings:

  - You are about to drop the column `chapter` on the `BookChapter` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `BookChapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."BookChapter" DROP COLUMN "chapter",
DROP COLUMN "text",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "name" TEXT;
