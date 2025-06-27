-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_confirmation_code" TEXT,
ADD COLUMN     "email_confirmation_code_expiration_date" TEXT,
ADD COLUMN     "is_email_confirmed" BOOLEAN NOT NULL DEFAULT false;
