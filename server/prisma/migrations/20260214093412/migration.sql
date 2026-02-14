/*
  Warnings:

  - You are about to drop the column `included_balance` on the `UserSubscription` table. All the data in the column will be lost.
  - Added the required column `balance` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tariff" ALTER COLUMN "duration_days" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "included_balance",
ADD COLUMN     "balance" INTEGER NOT NULL;
