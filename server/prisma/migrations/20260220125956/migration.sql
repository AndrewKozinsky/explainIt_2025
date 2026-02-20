/*
  Warnings:

  - Made the column `note` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VideoPublic" ALTER COLUMN "note" SET NOT NULL;
