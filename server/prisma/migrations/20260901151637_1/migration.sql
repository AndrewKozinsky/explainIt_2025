/*
  Warnings:

  - You are about to drop the `Flashcard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_book_id_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_sentence_phrase_translation_id_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_video_id_fkey";

-- DropTable
DROP TABLE "Flashcard";

-- CreateTable
CREATE TABLE "AiDialogueScenario" (
    "id" SERIAL NOT NULL,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "system_prompt" TEXT NOT NULL,
    "language_code" "LanguageCode" NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiDialogueScenario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiDialogueScenario_slug_key" ON "AiDialogueScenario"("slug");

-- CreateIndex
CREATE INDEX "AiDialogueScenario_user_id_idx" ON "AiDialogueScenario"("user_id");

-- AddForeignKey
ALTER TABLE "AiDialogueScenario" ADD CONSTRAINT "AiDialogueScenario_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
