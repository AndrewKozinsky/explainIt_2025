/*
  Warnings:

  - You are about to drop the column `is_private_media_included` on the `Tariff` table. All the data in the column will be lost.
  - You are about to drop the column `is_public_media_included` on the `Tariff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tariff" DROP COLUMN "is_private_media_included",
DROP COLUMN "is_public_media_included";
