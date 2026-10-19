-- CreateEnum
CREATE TYPE "CefrSimplificationLevel" AS ENUM ('A1', 'A2', 'B1', 'B2');

-- AlterTable
ALTER TABLE "AiDialogue" ADD COLUMN "max_cefr_level" "CefrSimplificationLevel";
