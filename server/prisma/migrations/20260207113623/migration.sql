/*
  Warnings:

  - Made the column `file_s3_key` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `original_content` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `processed_content` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `s3_provider_name` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file_name` on table `VideoPublic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VideoPublic" ALTER COLUMN "file_s3_key" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "original_content" SET NOT NULL,
ALTER COLUMN "processed_content" SET NOT NULL,
ALTER COLUMN "s3_provider_name" SET NOT NULL,
ALTER COLUMN "file_name" SET NOT NULL;
