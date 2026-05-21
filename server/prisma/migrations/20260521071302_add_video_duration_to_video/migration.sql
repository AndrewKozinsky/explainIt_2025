-- AlterTable
ALTER TABLE "VideoPrivate" ADD COLUMN     "file_duration_sec" INTEGER,
ADD COLUMN     "subtitles_generation_charge_kopecks" INTEGER,
ADD COLUMN     "subtitles_generation_refunded_at" TIMESTAMP(3);

-- AlterEnum
ALTER TYPE "BalanceTransactionType" ADD VALUE 'REFUND';
