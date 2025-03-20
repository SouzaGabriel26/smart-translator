/*
  Warnings:

  - You are about to drop the `TranslationPhrases` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `planId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TranslationPhrases" DROP CONSTRAINT "TranslationPhrases_translation_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "planId" UUID NOT NULL;

-- DropTable
DROP TABLE "TranslationPhrases";

-- CreateTable
CREATE TABLE "translation_phrases" (
    "id" UUID NOT NULL,
    "translation_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "translated_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translation_phrases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "translations_limit" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation_phrases" ADD CONSTRAINT "translation_phrases_translation_id_fkey" FOREIGN KEY ("translation_id") REFERENCES "translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
