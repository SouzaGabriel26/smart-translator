import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { Button } from './ui/button';
import { Input } from './ui/input';

export async function CapturePlanLeads() {
  const language = await getAppLanguageAction();
  const { plansSection } = getLanguageContext(language);

  return (
    <div className="border rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <h2 className="text-xl font-bold">{plansSection.getPremiumAccess}</h2>
      <p className="text-muted-foreground text-sm tracking-tighter">
        {plansSection.getPremiumAccessDescription}
      </p>

      <form className="space-y-4 flex flex-col">
        <Input
          name="email"
          type="email"
          placeholder={plansSection.enterEmailAddress}
        />
        <Button className="self-end">{plansSection.joinWaitlist}</Button>
      </form>
    </div>
  );
}
