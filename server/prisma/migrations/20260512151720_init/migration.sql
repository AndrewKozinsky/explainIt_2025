-- CreateEnum
CREATE TYPE "BalanceTransactionType" AS ENUM ('CHARGE', 'TOP_UP');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentProviderName" AS ENUM ('YOOKASSA');

-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'es', 'fr', 'de', 'ru');

-- CreateEnum
CREATE TYPE "S3ProviderName" AS ENUM ('cloudRu');

-- CreateEnum
CREATE TYPE "VideoTextType" AS ENUM ('text', 'subtitles');

-- CreateEnum
CREATE TYPE "SubtitlesGenerationStatus" AS ENUM ('idle', 'pending', 'processing', 'done', 'failed');

-- CreateEnum
CREATE TYPE "SentencePhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

-- CreateEnum
CREATE TYPE "SentenceChatMessageRole" AS ENUM ('user', 'assistant');

-- CreateEnum
CREATE TYPE "SentenceChatMessageStatus" AS ENUM ('streaming', 'completed', 'canceled', 'failed');

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
CREATE TABLE "UserBalanceTransaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "BalanceTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBalanceTransaction_pkey" PRIMARY KEY ("id")
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
    "source_language_code" "LanguageCode" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookPublic" (
    "id" SERIAL NOT NULL,
    "free_to_use" BOOLEAN DEFAULT false,
    "source_language_code" "LanguageCode" NOT NULL,
    "covers" TEXT[],
    "coverBackgroundColor" TEXT NOT NULL,
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
    "original_content" TEXT,
    "processed_content" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoPrivate" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "year" INTEGER,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "s3_provider_name" "S3ProviderName",
    "is_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "file_size_mb" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoTextType" NOT NULL DEFAULT 'text',
    "subtitles_generation_status" "SubtitlesGenerationStatus" NOT NULL DEFAULT 'idle',
    "subtitles_generation_error" TEXT,
    "subtitles_generation_started_at" TIMESTAMP(3),
    "subtitles_generation_job_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPrivate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoPublic" (
    "id" SERIAL NOT NULL,
    "free_to_use" BOOLEAN DEFAULT false,
    "source_language_code" "LanguageCode" NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_s3_key" TEXT NOT NULL,
    "s3_provider_name" "S3ProviderName" NOT NULL,
    "note" TEXT NOT NULL,
    "covers" TEXT[],
    "coverBackgroundColor" TEXT NOT NULL,
    "original_content" TEXT NOT NULL,
    "processed_content" TEXT NOT NULL,
    "content_type" "VideoTextType" NOT NULL DEFAULT 'text',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPublic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "book_chapter_id" INTEGER,
    "video_private_id" INTEGER,
    "video_public_id" INTEGER,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceTranslation" (
    "id" SERIAL NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "translation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentenceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentencePhraseTranslation" (
    "id" SERIAL NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "phrase" TEXT NOT NULL,
    "phrase_start_offset" INTEGER NOT NULL,
    "phrase_end_offset" INTEGER NOT NULL,
    "translate" TEXT,
    "examples" TEXT[],
    "status" "SentencePhraseTranslationStatus" NOT NULL,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentencePhraseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" SERIAL NOT NULL,
    "start_time_ms" INTEGER NOT NULL,
    "end_time_ms" INTEGER NOT NULL,
    "start_offset" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "order_index" INTEGER NOT NULL,
    "video_private_id" INTEGER,
    "video_public_id" INTEGER,

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
CREATE TABLE "UniversalPhrase" (
    "id" SERIAL NOT NULL,
    "phrase" TEXT NOT NULL,
    "language_code" "LanguageCode" NOT NULL,

    CONSTRAINT "UniversalPhrase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversalTranscription" (
    "id" SERIAL NOT NULL,
    "universal_phrase_id" INTEGER NOT NULL,
    "ipa" TEXT,
    "pinyin" TEXT,

    CONSTRAINT "UniversalTranscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversalAudioPronunciation" (
    "id" SERIAL NOT NULL,
    "universal_phrase_id" INTEGER NOT NULL,
    "s3_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalAudioPronunciation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceChatThread" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sentence_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentenceChatThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceChatMessage" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "role" "SentenceChatMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "status" "SentenceChatMessageStatus" NOT NULL DEFAULT 'completed',
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentenceChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "language_code" "LanguageCode" NOT NULL,
    "sentence_text" TEXT NOT NULL,
    "sentence_translation" TEXT,
    "phrase" TEXT NOT NULL,
    "phrase_start_offset" INTEGER NOT NULL,
    "phrase_end_offset" INTEGER NOT NULL,
    "phrase_translation" TEXT,
    "examples" TEXT[],
    "book_private_id" INTEGER,
    "book_public_id" INTEGER,
    "video_private_id" INTEGER,
    "video_public_id" INTEGER,
    "sentence_phrase_translation_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserBalanceTransaction_payment_id_key" ON "UserBalanceTransaction"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_external_id_key" ON "Payment"("external_id");

-- CreateIndex
CREATE INDEX "SentenceTranslation_sentence_id_idx" ON "SentenceTranslation"("sentence_id");

-- CreateIndex
CREATE INDEX "SentenceTranslation_sentence_id_target_language_code_idx" ON "SentenceTranslation"("sentence_id", "target_language_code");

-- CreateIndex
CREATE INDEX "SentencePhraseTranslation_sentence_id_idx" ON "SentencePhraseTranslation"("sentence_id");

-- CreateIndex
CREATE INDEX "SentencePhraseTranslation_sentence_id_target_language_code_idx" ON "SentencePhraseTranslation"("sentence_id", "target_language_code");

-- CreateIndex
CREATE INDEX "SentencePhraseTranslation_sentence_id_phrase_start_offset_p_idx" ON "SentencePhraseTranslation"("sentence_id", "phrase_start_offset", "phrase_end_offset");

-- CreateIndex
CREATE INDEX "SentencePhraseTranslation_sentence_id_target_language_code__idx" ON "SentencePhraseTranslation"("sentence_id", "target_language_code", "phrase_start_offset", "phrase_end_offset");

-- CreateIndex
CREATE INDEX "SubtitleSentenceInit_subtitle_id_idx" ON "SubtitleSentenceInit"("subtitle_id");

-- CreateIndex
CREATE INDEX "SubtitleSentenceInit_sentence_id_idx" ON "SubtitleSentenceInit"("sentence_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalPhrase_language_code_phrase_key" ON "UniversalPhrase"("language_code", "phrase");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalTranscription_universal_phrase_id_key" ON "UniversalTranscription"("universal_phrase_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalAudioPronunciation_universal_phrase_id_key" ON "UniversalAudioPronunciation"("universal_phrase_id");

-- CreateIndex
CREATE INDEX "SentenceChatThread_user_id_idx" ON "SentenceChatThread"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SentenceChatThread_user_id_sentence_id_key" ON "SentenceChatThread"("user_id", "sentence_id");

-- CreateIndex
CREATE INDEX "SentenceChatMessage_thread_id_idx" ON "SentenceChatMessage"("thread_id");

-- CreateIndex
CREATE INDEX "Flashcard_user_id_idx" ON "Flashcard"("user_id");

-- CreateIndex
CREATE INDEX "Flashcard_user_id_language_code_idx" ON "Flashcard"("user_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_user_id_sentence_phrase_translation_id_key" ON "Flashcard"("user_id", "sentence_phrase_translation_id");

-- AddForeignKey
ALTER TABLE "UserBalanceTransaction" ADD CONSTRAINT "UserBalanceTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBalanceTransaction" ADD CONSTRAINT "UserBalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_video_public_id_fkey" FOREIGN KEY ("video_public_id") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentencePhraseTranslation" ADD CONSTRAINT "SentencePhraseTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_private_id_fkey" FOREIGN KEY ("video_private_id") REFERENCES "VideoPrivate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_public_id_fkey" FOREIGN KEY ("video_public_id") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_subtitle_id_fkey" FOREIGN KEY ("subtitle_id") REFERENCES "Subtitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalTranscription" ADD CONSTRAINT "UniversalTranscription_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalAudioPronunciation" ADD CONSTRAINT "UniversalAudioPronunciation_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatMessage" ADD CONSTRAINT "SentenceChatMessage_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "SentenceChatThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_book_private_id_fkey" FOREIGN KEY ("book_private_id") REFERENCES "BookPrivate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_book_public_id_fkey" FOREIGN KEY ("book_public_id") REFERENCES "BookPublic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_video_private_id_fkey" FOREIGN KEY ("video_private_id") REFERENCES "VideoPrivate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_video_public_id_fkey" FOREIGN KEY ("video_public_id") REFERENCES "VideoPublic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_sentence_phrase_translation_id_fkey" FOREIGN KEY ("sentence_phrase_translation_id") REFERENCES "SentencePhraseTranslation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
