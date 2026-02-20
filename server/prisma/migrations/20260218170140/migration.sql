/*
  Warnings:

  - You are about to drop the column `cover` on the `BookPublic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookPublic" DROP COLUMN "cover",
ADD COLUMN     "covers" TEXT[];
