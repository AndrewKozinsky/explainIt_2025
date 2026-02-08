-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_videoPublicId_fkey";

-- DropForeignKey
ALTER TABLE "Subtitle" DROP CONSTRAINT "Subtitle_videoPublicId_fkey";

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_videoPublicId_fkey" FOREIGN KEY ("videoPublicId") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_videoPublicId_fkey" FOREIGN KEY ("videoPublicId") REFERENCES "VideoPublic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
