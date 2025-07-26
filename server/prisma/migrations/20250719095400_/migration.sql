/*
  Warnings:

  - You are about to drop the column `providerName` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "providerName",
ADD COLUMN     "provider_name" "PaymentProviderName" NOT NULL DEFAULT 'YOOKASSA',
ALTER COLUMN "external_id" DROP NOT NULL;
