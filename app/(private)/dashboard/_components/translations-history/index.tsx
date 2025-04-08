import { checkUserAction } from '@/actions/auth/check-user';
import { getAppLanguageAction, getModeAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { prismaClient } from '@/lib/prisma-client';
import { TranslationsHistoryContent } from './content';

export async function TranslationsHistory() {
  const language = await getAppLanguageAction();
  const { dashboard } = getLanguageContext(language);
  const user = await checkUserAction();
  const mode = await getModeAction();
  const isHardMode = mode === 'hard';

  const translations = await prismaClient.translations.findMany({
    where: {
      userId: user.id,
      discarded: false,
    },
    include: {
      phrases: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <TranslationsHistoryContent
      isHardMode={isHardMode}
      language={language}
      historyLanguage={dashboard.history}
      initialTranslations={translations}
    />
  );
}
