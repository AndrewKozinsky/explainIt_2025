/*
  Warnings:

  - You are about to drop the column `coverBackgroundColor` on the `BookPublic` table. All the data in the column will be lost.
  - You are about to drop the column `free_to_use` on the `BookPublic` table. All the data in the column will be lost.
  - You are about to drop the column `coverBackgroundColor` on the `VideoPublic` table. All the data in the column will be lost.
  - You are about to drop the column `free_to_use` on the `VideoPublic` table. All the data in the column will be lost.
  - Made the column `non_existent_word` on table `UniversalPhraseTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookPublic" DROP COLUMN "coverBackgroundColor",
DROP COLUMN "free_to_use";

-- AlterTable
ALTER TABLE "UniversalPhraseTranslation" ALTER COLUMN "non_existent_word" SET NOT NULL;

-- AlterTable
ALTER TABLE "VideoPrivate" ALTER COLUMN "is_file_uploaded" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VideoPublic" DROP COLUMN "coverBackgroundColor",
DROP COLUMN "free_to_use";
