-- DropForeignKey
ALTER TABLE "TranslationPhrases" DROP CONSTRAINT "TranslationPhrases_translation_id_fkey";

-- AddForeignKey
ALTER TABLE "TranslationPhrases" ADD CONSTRAINT "TranslationPhrases_translation_id_fkey" FOREIGN KEY ("translation_id") REFERENCES "translations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
