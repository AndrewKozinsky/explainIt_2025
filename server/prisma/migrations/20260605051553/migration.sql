/*
  Warnings:

  - You are about to drop the column `lemma` on the `GrammarConcept` table. All the data in the column will be lost.
  - You are about to drop the column `lemma` on the `MissingGrammarConcept` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[source_language_code,target_language_code,category,slug]` on the table `GrammarConcept` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `MissingGrammarConcept` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GrammarConcept_source_language_code_target_language_code_ca_key";

-- AlterTable
ALTER TABLE "GrammarConcept" DROP COLUMN "lemma";

-- AlterTable
ALTER TABLE "MissingGrammarConcept" DROP COLUMN "lemma",
ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GrammarConcept_source_language_code_target_language_code_ca_key" ON "GrammarConcept"("source_language_code", "target_language_code", "category", "slug");
