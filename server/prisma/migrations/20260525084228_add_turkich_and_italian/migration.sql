-- AlterEnum
ALTER TYPE "BalanceTransactionType" ADD VALUE 'REFUND';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LanguageCode" ADD VALUE 'it';
ALTER TYPE "LanguageCode" ADD VALUE 'tr';

-- AlterTable
ALTER TABLE "BookPublic" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VideoPrivate" ADD COLUMN     "file_duration_sec" INTEGER,
ADD COLUMN     "subtitles_generation_charge_kopecks" INTEGER,
ADD COLUMN     "subtitles_generation_refunded_at" TIMESTAMP(3);
