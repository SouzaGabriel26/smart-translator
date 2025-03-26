import { getAppLanguageAction } from '@/app/actions';
import { SignInForm } from '@/components/sign-in';
import { getLanguageContext } from '@/config/app-language-context';

export default async function SignIn() {
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  return (
    <SignInForm appLanguageContext={appLanguageContext} language={language} />
  );
}
