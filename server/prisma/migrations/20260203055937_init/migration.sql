-- CreateEnum
CREATE TYPE "BalanceTransactionType" AS ENUM ('TOP_UP', 'CHARGE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentProviderName" AS ENUM ('YOOKASSA');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'tr', 'ar', 'zhCMN', 'ko', 'ja');

-- CreateEnum
CREATE TYPE "VideoContentType" AS ENUM ('text', 'subtitles');

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
    "language" "Language" NOT NULL,
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
CREATE TABLE "VideoPrivate" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "file_url" TEXT,
    "is_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "file_size_mb" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "year" INTEGER,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoContentType" NOT NULL DEFAULT 'text',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoPublic" (
    "id" SERIAL NOT NULL,
    "language" "Language" NOT NULL,
    "file_s3_key" TEXT,
    "file_url" TEXT,
    "name" TEXT,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoContentType" NOT NULL DEFAULT 'text',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPublic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "book_chapter_id" INTEGER,
    "video_private_id" INTEGER,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,
    "videoPublicId" INTEGER,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceTranslation" (
    "id" SERIAL NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    "analysis" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentenceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" SERIAL NOT NULL,
    "video_private_id" INTEGER,
    "start_time_ms" INTEGER NOT NULL,
    "end_time_ms" INTEGER NOT NULL,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,
    "videoPublicId" INTEGER,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubtitleSentenceInit" (
    "id" SERIAL NOT NULL,
    "subtitle_id" INTEGER NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,

    CONSTRAINT "SubtitleSentenceInit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngRusDictionary" (
    "id" SERIAL NOT NULL,
    "eng" TEXT NOT NULL,
    "rus" TEXT NOT NULL,
    "transcription" TEXT,
    "lexemes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngRusDictionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransaction_payment_id_key" ON "BalanceTransaction"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_external_id_key" ON "Payment"("external_id");

-- CreateIndex
CREATE INDEX "SentenceTranslation_sentence_id_idx" ON "SentenceTranslation"("sentence_id");

-- CreateIndex
CREATE INDEX "SubtitleSentenceInit_subtitle_id_idx" ON "SubtitleSentenceInit"("subtitle_id");

-- CreateIndex
CREATE INDEX "SubtitleSentenceInit_sentence_id_idx" ON "SubtitleSentenceInit"("sentence_id");

-- CreateIndex
CREATE UNIQUE INDEX "EngRusDictionary_eng_key" ON "EngRusDictionary"("eng");

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
ALTER TABLE "VideoPrivate" ADD CONSTRAINT "VideoPrivate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_book_chapter_id_fkey" FOREIGN KEY ("book_chapter_id") REFERENCES "BookChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_video_private_id_fkey" FOREIGN KEY ("video_private_id") REFERENCES "VideoPrivate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_videoPublicId_fkey" FOREIGN KEY ("videoPublicId") REFERENCES "VideoPublic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_private_id_fkey" FOREIGN KEY ("video_private_id") REFERENCES "VideoPrivate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_videoPublicId_fkey" FOREIGN KEY ("videoPublicId") REFERENCES "VideoPublic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_subtitle_id_fkey" FOREIGN KEY ("subtitle_id") REFERENCES "Subtitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
