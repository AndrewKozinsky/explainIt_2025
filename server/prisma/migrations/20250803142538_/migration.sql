/*
  Warnings:

  - The values [WELCOME_BONUS] on the enum `BalanceTransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `balance_id` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `BalanceTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BalanceTransactionStatus_new" AS ENUM ('PAYMENT', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS');
ALTER TABLE "public"."BalanceTransaction" ALTER COLUMN "type" TYPE "public"."BalanceTransactionStatus_new" USING ("type"::text::"public"."BalanceTransactionStatus_new");
ALTER TYPE "public"."BalanceTransactionStatus" RENAME TO "BalanceTransactionStatus_old";
ALTER TYPE "public"."BalanceTransactionStatus_new" RENAME TO "BalanceTransactionStatus";
DROP TYPE "public"."BalanceTransactionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_balance_id_fkey";

-- DropIndex
DROP INDEX "public"."Payment_balance_id_key";

-- AlterTable
ALTER TABLE "public"."BalanceTransaction" ADD COLUMN     "payment_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "balance_id";

-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransaction_payment_id_key" ON "public"."BalanceTransaction"("payment_id");

-- AddForeignKey
ALTER TABLE "public"."BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
