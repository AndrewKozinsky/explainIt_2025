/*
  Warnings:

  - You are about to drop the column `languageCode` on the `BookPrivate` table. All the data in the column will be lost.
  - You are about to drop the column `languageCode` on the `BookPublic` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `VideoPrivate` table. All the data in the column will be lost.
  - You are about to drop the column `languageCode` on the `VideoPrivate` table. All the data in the column will be lost.
  - You are about to drop the column `languageCode` on the `VideoPublic` table. All the data in the column will be lost.
  - Added the required column `language_code` to the `BookPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `BookPublic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `VideoPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3_provider` to the `VideoPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `VideoPublic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "S3Provider" AS ENUM ('cloudRu');

-- AlterTable
ALTER TABLE "BookPrivate" DROP COLUMN "languageCode",
ADD COLUMN     "language_code" "LanguageCode" NOT NULL;

-- AlterTable
ALTER TABLE "BookPublic" DROP COLUMN "languageCode",
ADD COLUMN     "language_code" "LanguageCode" NOT NULL;

-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "file_url",
DROP COLUMN "languageCode",
ADD COLUMN     "language_code" "LanguageCode" NOT NULL,
ADD COLUMN     "s3_provider" "S3Provider" NOT NULL;

-- AlterTable
ALTER TABLE "VideoPublic" DROP COLUMN "languageCode",
ADD COLUMN     "language_code" "LanguageCode" NOT NULL;
