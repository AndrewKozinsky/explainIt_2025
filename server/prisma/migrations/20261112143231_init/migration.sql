-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('MALE', 'FEMALE');

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
CREATE TYPE "SubtitlesSource" AS ENUM ('user', 'youTube', 'llm');

-- CreateEnum
CREATE TYPE "SubtitlesStatus" AS ENUM ('idle', 'pending', 'processing', 'done', 'failed');

-- CreateEnum
CREATE TYPE "SentencePhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

-- CreateEnum
CREATE TYPE "UniversalPhraseTranslationStatus" AS ENUM ('pending', 'ready', 'error');

-- CreateEnum
CREATE TYPE "WordSenseImageStatus" AS ENUM ('none', 'pending', 'generating', 'ready', 'failed');

-- CreateEnum
CREATE TYPE "SentenceChatMessageRole" AS ENUM ('user', 'assistant');

-- CreateEnum
CREATE TYPE "SentenceChatMessageStatus" AS ENUM ('streaming', 'completed', 'canceled', 'failed');

-- CreateEnum
CREATE TYPE "CefrSimplificationLevel" AS ENUM ('A1', 'A2', 'B1', 'B2');

-- CreateEnum
CREATE TYPE "AiDialogueMessageType" AS ENUM ('sceneUpdate', 'help', 'npcActions', 'userActions', 'userAvoidsNPC', 'worldEvent');

-- CreateEnum
CREATE TYPE "AiDialogueImageType" AS ENUM ('emotionSheet', 'angleSheet', 'scene');

-- CreateEnum
CREATE TYPE "ImageGenerationJobType" AS ENUM ('emotionSheet', 'angleSheet', 'scene');

-- CreateEnum
CREATE TYPE "ImageGenerationJobStatus" AS ENUM ('queued', 'waitingDependencies', 'generating', 'ready', 'failed');

-- CreateEnum
CREATE TYPE "ImageGenerationOutboxStatus" AS ENUM ('pending', 'published');

-- CreateEnum
CREATE TYPE "AiDialogueAudioStatus" AS ENUM ('generating', 'ready', 'failed');

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
    "gender" "UserGender" NOT NULL DEFAULT 'MALE',
    "avatar_preset_id" TEXT DEFAULT 'male-1',
    "avatar_s3_key" TEXT,
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
    "about" TEXT,
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
    "about" TEXT,
    "source_language_code" "LanguageCode" NOT NULL,
    "youtube_video_id" TEXT,
    "file_name" TEXT,
    "file_s3_key" TEXT,
    "s3_provider_name" "S3ProviderName",
    "is_file_uploaded" BOOLEAN DEFAULT false,
    "file_size_mb" INTEGER NOT NULL DEFAULT 0,
    "duration_sec" INTEGER NOT NULL DEFAULT 0,
    "original_content" TEXT,
    "processed_content" TEXT,
    "content_type" "VideoTextType" NOT NULL DEFAULT 'text',
    "cover_file_name" TEXT,
    "cover_file_s3_key" TEXT,
    "cover_file_s3_provider_name" "S3ProviderName",
    "is_cover_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
    "cover_url" TEXT,
    "subtitles_source" "SubtitlesSource" NOT NULL DEFAULT 'user',
    "subtitles_status" "SubtitlesStatus" NOT NULL DEFAULT 'idle',
    "subtitles_error_code" TEXT,
    "subtitles_job_id" TEXT,
    "proficiency_level" INTEGER,
    "topic" TEXT,
    "learnability_score" INTEGER,
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
    "error_code" TEXT,
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
    "error_code" TEXT,
    "non_existent_word" BOOLEAN NOT NULL DEFAULT false,
    "lemmas" TEXT,
    "deep_sections" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalPhraseTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordSense" (
    "id" SERIAL NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "lemma" TEXT NOT NULL,
    "gloss" TEXT NOT NULL,
    "visual_kind" TEXT,
    "visual_aspect" TEXT,
    "visual_prompt" TEXT,
    "image_s3_key" TEXT,
    "image_status" "WordSenseImageStatus" NOT NULL DEFAULT 'none',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WordSense_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "AiDialogueScenarioGroup" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueScenarioGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueScenario" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "system_prompt" TEXT NOT NULL,
    "user_scenario_amendment_hint" TEXT,
    "conversation_ideas" TEXT,
    "trained_skills" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "group_id" INTEGER,
    "cover_s3_key" TEXT,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogue" (
    "illustration_style_id" TEXT NOT NULL DEFAULT 'realism',
    "user_scenario_amendment" TEXT,
    "max_cefr_level" "CefrSimplificationLevel",
    "id" SERIAL NOT NULL,
    "scenario_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "source_language_code" "LanguageCode" NOT NULL,
    "target_language_code" "LanguageCode" NOT NULL,
    "summary" TEXT,
    "summary_up_to" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueMessage" (
    "id" SERIAL NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "character_id" INTEGER,
    "type" "AiDialogueMessageType" NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueCharacter" (
    "id" SERIAL NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "npc_id" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT,
    "appearance" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueImage" (
    "id" SERIAL NOT NULL,
    "character_id" INTEGER,
    "message_id" INTEGER,
    "type" "AiDialogueImageType" NOT NULL,
    "layout_version" TEXT,
    "s3_key" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageGenerationJob" (
    "id" SERIAL NOT NULL,
    "dedup_key" TEXT NOT NULL,
    "type" "ImageGenerationJobType" NOT NULL,
    "status" "ImageGenerationJobStatus" NOT NULL DEFAULT 'queued',
    "character_id" INTEGER,
    "message_id" INTEGER,
    "input" TEXT NOT NULL,
    "provider_request_id" TEXT,
    "provider_polling_url" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageGenerationJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageGenerationOutbox" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "status" "ImageGenerationOutboxStatus" NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageGenerationOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueVoice" (
    "id" SERIAL NOT NULL,
    "dialogue_id" INTEGER NOT NULL,
    "npc_id" TEXT NOT NULL,
    "voice" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueVoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiDialogueAudio" (
    "id" SERIAL NOT NULL,
    "message_id" INTEGER NOT NULL,
    "action_index" INTEGER NOT NULL,
    "s3_key" TEXT NOT NULL,
    "status" "AiDialogueAudioStatus" NOT NULL DEFAULT 'generating',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueAudio_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "WordSense_source_language_code_lemma_idx" ON "WordSense"("source_language_code", "lemma");

-- CreateIndex
CREATE UNIQUE INDEX "WordSense_source_language_code_lemma_gloss_key" ON "WordSense"("source_language_code", "lemma", "gloss");

-- CreateIndex
CREATE INDEX "SentenceChatThread_user_id_idx" ON "SentenceChatThread"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SentenceChatThread_user_id_sentence_id_key" ON "SentenceChatThread"("user_id", "sentence_id");

-- CreateIndex
CREATE INDEX "SentenceChatMessage_thread_id_idx" ON "SentenceChatMessage"("thread_id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueScenarioGroup_slug_key" ON "AiDialogueScenarioGroup"("slug");

-- CreateIndex
CREATE INDEX "AiDialogueScenarioGroup_position_id_idx" ON "AiDialogueScenarioGroup"("position", "id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueScenario_slug_key" ON "AiDialogueScenario"("slug");

-- CreateIndex
CREATE INDEX "AiDialogueScenario_user_id_idx" ON "AiDialogueScenario"("user_id");

-- CreateIndex
CREATE INDEX "AiDialogueScenario_group_id_position_id_idx" ON "AiDialogueScenario"("group_id", "position", "id");

-- CreateIndex
CREATE INDEX "AiDialogue_user_id_idx" ON "AiDialogue"("user_id");

-- CreateIndex
CREATE INDEX "AiDialogue_scenario_id_idx" ON "AiDialogue"("scenario_id");

-- CreateIndex
CREATE INDEX "AiDialogue_user_id_created_at_id_idx" ON "AiDialogue"("user_id", "created_at", "id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_idx" ON "AiDialogueMessage"("dialogue_id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_character_id_idx" ON "AiDialogueMessage"("character_id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_id_idx" ON "AiDialogueMessage"("dialogue_id", "id");

-- CreateIndex
CREATE INDEX "AiDialogueMessage_dialogue_id_type_id_idx" ON "AiDialogueMessage"("dialogue_id", "type", "id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueCharacter_dialogue_id_npc_id_key" ON "AiDialogueCharacter"("dialogue_id", "npc_id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueImage_s3_key_key" ON "AiDialogueImage"("s3_key");

-- CreateIndex
CREATE INDEX "AiDialogueImage_character_id_idx" ON "AiDialogueImage"("character_id");

-- CreateIndex
CREATE INDEX "AiDialogueImage_message_id_idx" ON "AiDialogueImage"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageGenerationJob_dedup_key_key" ON "ImageGenerationJob"("dedup_key");

-- CreateIndex
CREATE INDEX "ImageGenerationJob_status_idx" ON "ImageGenerationJob"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ImageGenerationOutbox_job_id_key" ON "ImageGenerationOutbox"("job_id");

-- CreateIndex
CREATE INDEX "ImageGenerationOutbox_status_idx" ON "ImageGenerationOutbox"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueVoice_dialogue_id_npc_id_key" ON "AiDialogueVoice"("dialogue_id", "npc_id");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudio_s3_key_key" ON "AiDialogueAudio"("s3_key");

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueAudio_message_id_action_index_key" ON "AiDialogueAudio"("message_id", "action_index");

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
ALTER TABLE "AiDialogueScenario" ADD CONSTRAINT "AiDialogueScenario_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "AiDialogueScenarioGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueScenario" ADD CONSTRAINT "AiDialogueScenario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogue" ADD CONSTRAINT "AiDialogue_scenario_id_fkey" FOREIGN KEY ("scenario_id") REFERENCES "AiDialogueScenario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogue" ADD CONSTRAINT "AiDialogue_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueMessage" ADD CONSTRAINT "AiDialogueMessage_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueMessage" ADD CONSTRAINT "AiDialogueMessage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueCharacter" ADD CONSTRAINT "AiDialogueCharacter_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueImage" ADD CONSTRAINT "AiDialogueImage_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueImage" ADD CONSTRAINT "AiDialogueImage_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationJob" ADD CONSTRAINT "ImageGenerationJob_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "AiDialogueCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationJob" ADD CONSTRAINT "ImageGenerationJob_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGenerationOutbox" ADD CONSTRAINT "ImageGenerationOutbox_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "ImageGenerationJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueVoice" ADD CONSTRAINT "AiDialogueVoice_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "AiDialogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiDialogueAudio" ADD CONSTRAINT "AiDialogueAudio_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "AiDialogueMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

