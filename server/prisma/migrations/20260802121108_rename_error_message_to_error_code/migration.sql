/*
  Warnings:

  - You are about to drop the column `error_message` on the `SentencePhraseTranslation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SentencePhraseTranslation" DROP COLUMN "error_message",
ADD COLUMN     "error_code" TEXT;
