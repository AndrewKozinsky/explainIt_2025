/*
  Warnings:

  - You are about to drop the column `language` on the `BookPublic` table. All the data in the column will be lost.
  - The `content_type` column on the `VideoPrivate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `language` on the `VideoPublic` table. All the data in the column will be lost.
  - The `content_type` column on the `VideoPublic` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `languageCode` to the `BookPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `BookPublic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `VideoPrivate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageCode` to the `VideoPublic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'tr', 'ar', 'zhCMN', 'ko', 'ja');

-- CreateEnum
CREATE TYPE "VideoTextType" AS ENUM ('text', 'subtitles');

-- AlterTable
ALTER TABLE "BookPrivate" ADD COLUMN     "languageCode" "LanguageCode" NOT NULL;

-- AlterTable
ALTER TABLE "BookPublic" DROP COLUMN "language",
ADD COLUMN     "languageCode" "LanguageCode" NOT NULL;

-- AlterTable
ALTER TABLE "VideoPrivate" ADD COLUMN     "languageCode" "LanguageCode" NOT NULL,
DROP COLUMN "content_type",
ADD COLUMN     "content_type" "VideoTextType" NOT NULL DEFAULT 'text';

-- AlterTable
ALTER TABLE "VideoPublic" DROP COLUMN "language",
ADD COLUMN     "languageCode" "LanguageCode" NOT NULL,
DROP COLUMN "content_type",
ADD COLUMN     "content_type" "VideoTextType" NOT NULL DEFAULT 'text';

-- DropEnum
DROP TYPE "Language";

-- DropEnum
DROP TYPE "VideoContentType";
