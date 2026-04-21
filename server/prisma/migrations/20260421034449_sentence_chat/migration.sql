-- CreateEnum
CREATE TYPE "SentenceChatMessageRole" AS ENUM ('user', 'assistant');

-- CreateEnum
CREATE TYPE "SentenceChatMessageStatus" AS ENUM ('streaming', 'completed', 'canceled', 'failed');

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

-- CreateIndex
CREATE INDEX "SentenceChatThread_user_id_idx" ON "SentenceChatThread"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SentenceChatThread_user_id_sentence_id_key" ON "SentenceChatThread"("user_id", "sentence_id");

-- CreateIndex
CREATE INDEX "SentenceChatMessage_thread_id_idx" ON "SentenceChatMessage"("thread_id");

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatThread" ADD CONSTRAINT "SentenceChatThread_sentence_id_fkey" FOREIGN KEY ("sentence_id") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceChatMessage" ADD CONSTRAINT "SentenceChatMessage_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "SentenceChatThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
