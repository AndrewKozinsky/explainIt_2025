/*
  Warnings:

  - The values [PAYMENT] on the enum `BalanceTransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BalanceTransactionType_new" AS ENUM ('TOP_UP', 'CHARGE', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS');
ALTER TABLE "public"."BalanceTransaction" ALTER COLUMN "type" TYPE "public"."BalanceTransactionType_new" USING ("type"::text::"public"."BalanceTransactionType_new");
ALTER TYPE "public"."BalanceTransactionType" RENAME TO "BalanceTransactionType_old";
ALTER TYPE "public"."BalanceTransactionType_new" RENAME TO "BalanceTransactionType";
DROP TYPE "public"."BalanceTransactionType_old";
COMMIT;

-- CreateTable
CREATE TABLE "public"."BookChapterPhrase" (
    "id" SERIAL NOT NULL,
    "phrase" TEXT NOT NULL,
    "phraseTranslation" TEXT NOT NULL,
    "phraseExplanation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapterPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BookChapterPhraseExample" (
    "id" SERIAL NOT NULL,
    "book_chapter_phrase_id" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "sentenceTranslate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapterPhraseExample_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BookChapterPhraseExample" ADD CONSTRAINT "BookChapterPhraseExample_book_chapter_phrase_id_fkey" FOREIGN KEY ("book_chapter_phrase_id") REFERENCES "public"."BookChapterPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
