import { checkUserAction } from '@/actions/auth/check-user';
import { GenerateTranslationForm } from '@/components/generate-translation-form';
import { Input } from '@/components/ui/input';

export default async function Page() {
  const user = await checkUserAction();

  return (
    <div className="h-full">
      <header className='bg-black text-white h-16 flex justify-between items-center px-4'>
        <h1 className='text-2xl font-bold'>
          Smart Translator
        </h1>

        <span>
          Hello, {user.name}
        </span>
      </header>

      <main className="h-[calc(100%-64px)] flex flex-col px-6 py-12">
        <div className='flex flex-col h-1/2 md:h-1/3 sm:flex-row gap-4'>
          <div className='rounded w-full xl:w-1/2 flex flex-col'>
            <h2 className='mb-3  text-xl font-medium'>Translate a word</h2>

            <GenerateTranslationForm />
          </div>

          <div className='rounded w-full xl:w-1/2'>
            <h2 className='mb-3 text-xl font-medium'>Latest translations</h2>

            <div className='border rounded p-4'>
              <p className='text-center text-slate-400'>No translations yet. Enter a word to translate.</p>
            </div>
          </div>
        </div>

        <div className='h-full space-y-4'>
          <h3 className='mb-3 text-xl font-medium'>
            Translation History
          </h3>

          <form>
            <label htmlFor="translation_search" className='text-slate-600 text-sm'>Search translations</label>
            <Input
              id='translation_search'
              type='search'
              placeholder='Search for a word or a translation...'
            />
          </form>

          <div className='border rounded'>
            <p className='text-slate-400 text-center py-10'>No translations found. Try a different search term or translate a new word.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
