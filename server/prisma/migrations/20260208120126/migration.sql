/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Tariff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Tariff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tariff" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tariff_code_key" ON "Tariff"("code");
