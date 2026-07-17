-- Rename Book cover-related columns for clarity
ALTER TABLE "Book" RENAME COLUMN "file_name" TO "cover_file_name";
ALTER TABLE "Book" RENAME COLUMN "file_s3_key" TO "cover_file_s3_key";
ALTER TABLE "Book" RENAME COLUMN "s3_provider_name" TO "cover_file_s3_provider_name";
ALTER TABLE "Book" RENAME COLUMN "is_file_uploaded" TO "is_cover_file_uploaded";
