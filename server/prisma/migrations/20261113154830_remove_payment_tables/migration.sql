-- DropForeignKey
ALTER TABLE "UserBalanceTransaction" DROP CONSTRAINT "UserBalanceTransaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBalanceTransaction" DROP CONSTRAINT "UserBalanceTransaction_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- DropTable
DROP TABLE "UserBalanceTransaction";

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "BalanceTransactionType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "PaymentProviderName";

