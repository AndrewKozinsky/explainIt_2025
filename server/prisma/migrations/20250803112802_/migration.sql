/*
  Warnings:

  - A unique constraint covering the columns `[payment_id]` on the table `BalanceTransaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BalanceTransaction" DROP COLUMN "payment_id",
ADD COLUMN     "payment_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BalanceTransaction_payment_id_key" ON "public"."BalanceTransaction"("payment_id");

-- AddForeignKey
ALTER TABLE "public"."BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
