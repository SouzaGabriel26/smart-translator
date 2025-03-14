import { checkUserAction } from '@/actions/auth/check-user';
import { prismaClient } from '@/lib/prisma-client';
import { TranslationsHistoryContent } from './content';

export async function TranslationsHistory() {
  const user = await checkUserAction();

  const translations = await prismaClient.translations.findMany({
    where: {
      userId: user.id,
    },
    include: {
      phrases: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <TranslationsHistoryContent initialTranslations={translations} />;
}
