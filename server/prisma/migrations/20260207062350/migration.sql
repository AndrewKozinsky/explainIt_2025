/*
  Warnings:

  - You are about to drop the column `s3_provider` on the `VideoPrivate` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `VideoPublic` table. All the data in the column will be lost.
  - Added the required column `s3_provider_name` to the `VideoPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3_provider_name` to the `VideoPublic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "S3ProviderName" AS ENUM ('cloudRu');

-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "s3_provider",
ADD COLUMN     "s3_provider_name" "S3ProviderName" NOT NULL;

-- AlterTable
ALTER TABLE "VideoPublic" DROP COLUMN "file_url",
ADD COLUMN     "s3_provider_name" "S3ProviderName" NOT NULL;

-- DropEnum
DROP TYPE "S3Provider";
