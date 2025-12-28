-- CreateTable
CREATE TABLE "VideoPrivate" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url" TEXT,
    "name" TEXT,
    "transcription" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoPrivate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoPrivate" ADD CONSTRAINT "VideoPrivate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
