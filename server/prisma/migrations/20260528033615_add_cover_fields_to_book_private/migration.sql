-- AlterTable
ALTER TABLE "BookPrivate" ADD COLUMN     "file_name" TEXT,
ADD COLUMN     "file_s3_key" TEXT,
ADD COLUMN     "file_size_mb" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_file_uploaded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "s3_provider_name" "S3ProviderName";
