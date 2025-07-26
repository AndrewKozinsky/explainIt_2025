-- CreateEnum
CREATE TYPE "BalanceTransactionStatus" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "BalanceTransaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "BalanceTransactionStatus" NOT NULL,
    "amount" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
