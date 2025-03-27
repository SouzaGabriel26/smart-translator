import { getAppLanguageAction } from '@/app/actions';
import { SignUpForm } from '@/components/sign-up';
import { getLanguageContext } from '@/config/app-language-context';

export default async function SignIn() {
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  return (
    <SignUpForm appLanguageContext={appLanguageContext} language={language} />
  );
}
