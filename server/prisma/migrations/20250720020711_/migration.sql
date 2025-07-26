/*
  Warnings:

  - A unique constraint covering the columns `[external_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_external_id_key" ON "Payment"("external_id");
