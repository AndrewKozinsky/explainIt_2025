-- CreateTable
CREATE TABLE "EnglishRussianDictionary" (
    "id" SERIAL NOT NULL,
    "eng" TEXT NOT NULL,
    "rus" TEXT NOT NULL,
    "transcription" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnglishRussianDictionary_pkey" PRIMARY KEY ("id")
);
