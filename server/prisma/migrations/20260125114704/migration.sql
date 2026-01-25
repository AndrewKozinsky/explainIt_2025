/*
  Warnings:

  - Added the required column `length` to the `Subtitle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_offset` to the `Subtitle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtitle" ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "start_offset" INTEGER NOT NULL;
