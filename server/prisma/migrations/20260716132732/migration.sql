/*
  Warnings:

  - You are about to drop the column `cover_file_name` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `cover_file_s3_key` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `cover_file_s3_provider_name` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `is_cover_file_uploaded` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `source_language_code` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Video` table. All the data in the column will be lost.
  - Added the required column `video_collection_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_user_id_fkey";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "cover_file_name",
DROP COLUMN "cover_file_s3_key",
DROP COLUMN "cover_file_s3_provider_name",
DROP COLUMN "is_cover_file_uploaded",
DROP COLUMN "source_language_code",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "video_collection_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "VideoCollection" (
    "id" SERIAL NOT NULL,
    "type" "MediaType" NOT NULL,
    "user_id" INTEGER,
    "name" TEXT,
    "source_language_code" "LanguageCode" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoCollection" ADD CONSTRAINT "VideoCollection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_video_collection_id_fkey" FOREIGN KEY ("video_collection_id") REFERENCES "VideoCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
