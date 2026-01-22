-- CreateEnum
CREATE TYPE "BalanceTransactionType" AS ENUM ('TOP_UP', 'CHARGE', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentProviderName" AS ENUM ('YOOKASSA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "email_confirmation_code" TEXT,
    "email_confirmation_code_expiration_date" TEXT,
    "is_email_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_user_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceTransaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "BalanceTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "provider_name" "PaymentProviderName" NOT NULL DEFAULT 'YOOKASSA',
    "external_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookPrivate" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "author" TEXT,
    "name" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookPublic" (
    "id" SERIAL NOT NULL,
    "cover" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookPublic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapter" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER,
    "book_public_id" INTEGER,
    "name" TEXT,
    "header" TEXT,
    "content" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapterPhrase" (
    "id" SERIAL NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "phraseWordsIdx" INTEGER[],
    "phrase" TEXT NOT NULL,
    "phraseTranslation" TEXT NOT NULL,
    "phraseTranscription" TEXT NOT NULL,
    "phraseAnalysis" TEXT NOT NULL,
    "book_chapter_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapterPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapterPhraseExample" (
    "id" SERIAL NOT NULL,
    "book_chapter_phrase_id" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapterPhraseExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoPrivate" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "subtitles" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransaction_payment_id_key" ON "BalanceTransaction"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_external_id_key" ON "Payment"("external_id");

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPrivate" ADD CONSTRAINT "BookPrivate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapter" ADD CONSTRAINT "BookChapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "BookPrivate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapter" ADD CONSTRAINT "BookChapter_book_public_id_fkey" FOREIGN KEY ("book_public_id") REFERENCES "BookPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapterPhrase" ADD CONSTRAINT "BookChapterPhrase_book_chapter_id_fkey" FOREIGN KEY ("book_chapter_id") REFERENCES "BookChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapterPhraseExample" ADD CONSTRAINT "BookChapterPhraseExample_book_chapter_phrase_id_fkey" FOREIGN KEY ("book_chapter_phrase_id") REFERENCES "BookChapterPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoPrivate" ADD CONSTRAINT "VideoPrivate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
