-- AlterTable
ALTER TABLE "VideoPrivate" ALTER COLUMN "s3_provider_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VideoPublic" ALTER COLUMN "s3_provider_name" DROP NOT NULL;
