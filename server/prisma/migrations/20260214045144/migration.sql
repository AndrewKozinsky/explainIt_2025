/*
  Warnings:

  - You are about to drop the column `videoPublicId` on the `Sentence` table. All the data in the column will be lost.
  - You are about to drop the column `videoPublicId` on the `Subtitle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_videoPublicId_fkey";

-- DropForeignKey
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_videoPublicId_fkey";

-- DropIndex
DROP INDEX "BalanceTransaction_payment_id_key";

-- AlterTable
ALTER TABLE "Sentence" DROP COLUMN "videoPublicId",
ADD COLUMN     "video_public_id" INTEGER;

-- AlterTable
ALTER TABLE "Subtitle" DROP COLUMN "videoPublicId",
ADD COLUMN     "video_public_id" INTEGER;

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "price_paid" INTEGER NOT NULL,
    "included_balance" INTEGER NOT NULL,
    "included_file_storage_mb" INTEGER NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "payment_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_payment_id_key" ON "UserSubscription"("payment_id");

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_video_public_id_fkey" FOREIGN KEY ("video_public_id") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_video_public_id_fkey" FOREIGN KEY ("video_public_id") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "Tariff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
