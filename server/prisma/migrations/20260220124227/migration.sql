/*
  Warnings:

  - Made the column `year` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VideoPublic" ALTER COLUMN "year" SET NOT NULL;
