-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" ADD COLUMN     "phraseWordsIdx" INTEGER[],
ALTER COLUMN "phrase" SET NOT NULL,
ALTER COLUMN "phrase" SET DATA TYPE TEXT;
