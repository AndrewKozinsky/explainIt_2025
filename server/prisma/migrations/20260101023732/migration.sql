/*
  Warnings:

  - You are about to drop the column `url` on the `VideoPrivate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VideoPrivate" DROP COLUMN "url",
ADD COLUMN     "file_url" TEXT,
ADD COLUMN     "is_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
