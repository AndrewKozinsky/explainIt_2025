/*
  Warnings:

  - You are about to drop the `EnglishRussianDictionary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `file_size_mb` to the `VideoPrivate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" ADD COLUMN     "file_size_mb" INTEGER NOT NULL;

-- DropTable
DROP TABLE "EnglishRussianDictionary";

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
CREATE UNIQUE INDEX "EngRusDictionary_eng_key" ON "EngRusDictionary"("eng");
