-- CreateEnum
CREATE TYPE "BalanceTransactionType" AS ENUM ('CHARGE', 'TOP_UP', 'REFUND');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentProviderName" AS ENUM ('YOOKASSA');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'es', 'fr', 'de', 'it', 'tr', 'ru');

-- CreateEnum
CREATE TYPE "S3ProviderName" AS ENUM ('cloudRu');

-- CreateEnum
CREATE TYPE "VideoTextType" AS ENUM ('text', 'subtitles');

-- CreateEnum
CREATE TYPE "SubtitlesGenerationStatus" AS ENUM ('idle', 'pending', 'processing', 'done', 'failed');

-- CreateEnum
CREATE TYPE "SentencePhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

-- CreateEnum
CREATE TYPE "UniversalPhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

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
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "type" "MediaType" NOT NULL,
    "user_id" INTEGER,
    "author" TEXT,
    "name" TEXT,
    "source_language_code" "LanguageCode" NOT NULL,
    "note" TEXT,
    "cover_file_name" TEXT,
    "cover_file_s3_key" TEXT,
    "cover_file_s3_provider_name" "S3ProviderName",
    "is_cover_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapter" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "name" TEXT,
    "header" TEXT,
    "original_content" TEXT,
    "processed_content" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "type" "MediaType" NOT NULL,
    "user_id" INTEGER,
    "name" TEXT,
    "note" TEXT,
    "source_language_code" "LanguageCode" NOT NULL,
    "youtube_video_id" TEXT,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "s3_provider_name" "S3ProviderName",
    "is_file_uploaded" BOOLEAN DEFAULT false,
    "file_size_mb" INTEGER NOT NULL DEFAULT 0,
    "file_duration_sec" INTEGER,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoTextType" NOT NULL DEFAULT 'text',
    "cover_file_name" TEXT,
    "cover_file_s3_key" TEXT,
    "cover_file_s3_provider_name" "S3ProviderName",
    "is_cover_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "subtitles_generation_status" "SubtitlesGenerationStatus" NOT NULL DEFAULT 'idle',
    "subtitles_generation_error" TEXT,
    "subtitles_generation_started_at" TIMESTAMP(3),
    "subtitles_generation_job_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "book_chapter_id" INTEGER,
    "video_id" INTEGER,
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
    "video_id" INTEGER,

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
    "text" TEXT NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "UniversalPhraseTranslation" (
    "id" SERIAL NOT NULL,
    "universal_phrase_id" INTEGER NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "translation" TEXT,
    "status" "UniversalPhraseTranslationStatus" NOT NULL DEFAULT 'pending',
    "error_message" TEXT,
    "non_existent_word" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalPhraseTranslation_pkey" PRIMARY KEY ("id")
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
    "book_id" INTEGER,
    "video_id" INTEGER,
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
CREATE UNIQUE INDEX "Video_youtube_video_id_key" ON "Video"("youtube_video_id");

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
CREATE UNIQUE INDEX "UniversalPhrase_source_language_code_text_key" ON "UniversalPhrase"("source_language_code", "text");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalTranscription_universal_phrase_id_key" ON "UniversalTranscription"("universal_phrase_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalAudioPronunciation_universal_phrase_id_key" ON "UniversalAudioPronunciation"("universal_phrase_id");

-- CreateIndex
CREATE INDEX "UniversalPhraseTranslation_universal_phrase_id_idx" ON "UniversalPhraseTranslation"("universal_phrase_id");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalPhraseTranslation_universal_phrase_id_target_langu_key" ON "UniversalPhraseTranslation"("universal_phrase_id", "target_language_code");

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
ALTER TABLE "Book" ADD CONSTRAINT "Book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapter" ADD CONSTRAINT "BookChapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_book_chapter_id_fkey" FOREIGN KEY ("book_chapter_id") REFERENCES "BookChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentencePhraseTranslation" ADD CONSTRAINT "SentencePhraseTranslation_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_subtitle_id_fkey" FOREIGN KEY ("subtitle_id") REFERENCES "Subtitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentenceInit" ADD CONSTRAINT "SubtitleSentenceInit_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalTranscription" ADD CONSTRAINT "UniversalTranscription_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalAudioPronunciation" ADD CONSTRAINT "UniversalAudioPronunciation_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalPhraseTranslation" ADD CONSTRAINT "UniversalPhraseTranslation_universal_phrase_id_fkey" FOREIGN KEY ("universal_phrase_id") REFERENCES "UniversalPhrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatMessage" ADD CONSTRAINT "SentenceChatMessage_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "SentenceChatThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_sentence_phrase_translation_id_fkey" FOREIGN KEY ("sentence_phrase_translation_id") REFERENCES "SentencePhraseTranslation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
