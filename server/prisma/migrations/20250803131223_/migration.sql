/*
  Warnings:

  - You are about to drop the column `payment_id` on the `BalanceTransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[balance_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BonusType" AS ENUM ('WELCOME_BONUS');

-- DropForeignKey
ALTER TABLE "public"."BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_payment_id_fkey";

-- DropIndex
DROP INDEX "public"."BalanceTransaction_payment_id_key";

-- AlterTable
ALTER TABLE "public"."BalanceTransaction" DROP COLUMN "payment_id";

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "balance_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Bonus" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "public"."BonusType" NOT NULL,
    "balance_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bonus_balance_id_key" ON "public"."Bonus"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_balance_id_key" ON "public"."Payment"("balance_id");

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "public"."BalanceTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bonus" ADD CONSTRAINT "Bonus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bonus" ADD CONSTRAINT "Bonus_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "public"."BalanceTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
