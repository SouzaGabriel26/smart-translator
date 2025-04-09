import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { CaptureLeadsForm } from './capture-leads-form';

export async function CapturePlanLeads() {
  const language = await getAppLanguageAction();
  const { plansSection } = getLanguageContext(language);

  return (
    <div className="border rounded-xl px-4 py-2 shadow-xs flex flex-col gap-2">
      <h2 className="text-xl font-bold">{plansSection.getPremiumAccess}</h2>
      <p className="text-muted-foreground text-sm tracking-tighter">
        {plansSection.getPremiumAccessDescription}
      </p>

      <CaptureLeadsForm plansSection={plansSection} />
    </div>
  );
}
