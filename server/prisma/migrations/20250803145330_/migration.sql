-- DropForeignKey
ALTER TABLE "public"."BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_payment_id_fkey";

-- AlterTable
ALTER TABLE "public"."BalanceTransaction" ALTER COLUMN "payment_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "public"."Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
