-- AlterTable
ALTER TABLE "BalanceTransaction" ALTER COLUMN "payment_id" DROP NOT NULL,
ALTER COLUMN "payment_id" SET DATA TYPE TEXT;
