import { checkUserAction } from '@/actions/auth/check-user';
import { GenerateTranslationForm } from '@/components/generate-translation-form';
import { Input } from '@/components/ui/input';
import { prismaClient } from '@/lib/prisma-client';

export default async function Page() {
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

  const latestTranslation = translations[0];

  return (
    <div className="h-full">
      <header className="bg-black text-white h-16 flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Smart Translator</h1>

        <span>Hello, {user.name}</span>
      </header>

      <main className="h-[calc(100%-64px)] flex flex-col px-6 py-12 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="rounded w-full xl:w-1/2 flex flex-col">
            <h2 className="mb-3  text-xl font-medium">Translate a word</h2>

            <GenerateTranslationForm />
          </div>

          <div className="rounded w-full xl:w-1/2">
            <h2 className="mb-3 text-xl font-medium">Latest translations</h2>

            <div className="border rounded p-4">
              {translations.length === 0 ? (
                <p className="text-center text-slate-400">
                  No translations yet. Enter a word to translate.
                </p>
              ) : (
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">
                      {latestTranslation.targetWord} (
                      {latestTranslation.languageFrom}){' = '}
                      {latestTranslation.translatedWord} (
                      {latestTranslation.languageTo})
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {latestTranslation.createdAt.toLocaleDateString('en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <ul className="space-y-2 mt-4">
                      {latestTranslation.phrases.map((phrase) => (
                        <li key={phrase.id} className="flex flex-col">
                          <span className="font-bold">{phrase.content}</span>
                          <span className="text-sm text-muted-foreground">
                            {phrase.translatedContent}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-full space-y-4 pb-4 md:pb-0">
          <h3 className="mb-3 text-xl font-medium">Translation History</h3>

          <form>
            <label
              htmlFor="translation_search"
              className="text-slate-600 text-sm"
            >
              Search translations
            </label>
            <Input
              id="translation_search"
              type="search"
              placeholder="Search for a word or a translation..."
            />
          </form>

          <div className="border rounded overflow-y-auto h-96 p-4 bg-background">
            {translations.length === 0 ? (
              <p className="text-slate-400 text-center py-10">
                No translations found. Try a different search term or translate
                a new word.
              </p>
            ) : (
              translations.map((translation) => (
                <div key={translation.id} className="shadow-md rounded p-4">
                  <div className="text-xl">
                    <div className="flex">
                      <span className="font-bold">
                        {translation.targetWord} ({translation.languageFrom})
                      </span>
                      {' = '}
                      <span className="font-bold">
                        {translation.translatedWord} ({translation.languageTo})
                      </span>
                    </div>

                    <span className="text-muted-foreground">
                      {translation.createdAt.toLocaleDateString('en', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <ul className="space-y-2 mt-4">
                      {translation.phrases.map((phrase) => (
                        <li key={phrase.id} className="flex flex-col">
                          <span className="font-bold">{phrase.content}</span>
                          <span className="text-muted-foreground">
                            {phrase.translatedContent}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
