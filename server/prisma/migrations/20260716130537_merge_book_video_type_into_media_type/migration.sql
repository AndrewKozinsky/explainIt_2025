-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('public', 'private');

-- AlterTable Book: cast existing BookType values to MediaType
ALTER TABLE "Book" ALTER COLUMN "type" TYPE "MediaType" USING "type"::text::"MediaType";

-- AlterTable Video: cast existing VideoType values to MediaType
ALTER TABLE "Video" ALTER COLUMN "type" TYPE "MediaType" USING "type"::text::"MediaType";

-- DropEnum
DROP TYPE "BookType";

-- DropEnum
DROP TYPE "VideoType";
