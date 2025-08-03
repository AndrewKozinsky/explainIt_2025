/*
  Warnings:

  - The values [CREDIT,DEBIT] on the enum `BalanceTransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Bonus` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BalanceTransactionStatus_new" AS ENUM ('PAYMENT', 'WELCOME_BONUS');
ALTER TABLE "public"."BalanceTransaction" ALTER COLUMN "type" TYPE "public"."BalanceTransactionStatus_new" USING ("type"::text::"public"."BalanceTransactionStatus_new");
ALTER TYPE "public"."BalanceTransactionStatus" RENAME TO "BalanceTransactionStatus_old";
ALTER TYPE "public"."BalanceTransactionStatus_new" RENAME TO "BalanceTransactionStatus";
DROP TYPE "public"."BalanceTransactionStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Bonus" DROP CONSTRAINT "Bonus_balance_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Bonus" DROP CONSTRAINT "Bonus_user_id_fkey";

-- DropTable
DROP TABLE "public"."Bonus";

-- DropEnum
DROP TYPE "public"."BonusType";
