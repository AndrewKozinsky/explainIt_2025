/*
  Warnings:

  - You are about to drop the column `length` on the `Subtitle` table. All the data in the column will be lost.
  - Added the required column `end_time_ms` to the `Subtitle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtitle" DROP COLUMN "length",
ADD COLUMN     "end_time_ms" INTEGER NOT NULL;
