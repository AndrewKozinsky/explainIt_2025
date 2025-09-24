/*
  Warnings:

  - Added the required column `user_id` to the `BookChapterPhrase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookChapterPhrase" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."BookChapterPhrase" ADD CONSTRAINT "BookChapterPhrase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
