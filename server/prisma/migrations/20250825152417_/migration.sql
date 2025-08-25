-- DropForeignKey
ALTER TABLE "public"."BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."BookChapter" DROP CONSTRAINT "BookChapter_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book" ADD CONSTRAINT "Book_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BookChapter" ADD CONSTRAINT "BookChapter_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
