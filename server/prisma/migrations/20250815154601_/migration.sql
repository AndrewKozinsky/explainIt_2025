/*
  Warnings:

  - Changed the type of `type` on the `BalanceTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."BalanceTransactionType" AS ENUM ('PAYMENT', 'ACCOUNT_CONFIRMATION_WELCOME_BONUS');

-- AlterTable
ALTER TABLE "public"."BalanceTransaction" DROP COLUMN "type",
ADD COLUMN     "type" "public"."BalanceTransactionType" NOT NULL;

-- DropEnum
DROP TYPE "public"."BalanceTransactionStatus";
