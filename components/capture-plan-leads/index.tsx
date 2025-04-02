import { getAppLanguageAction } from '@/app/actions';
import { getLanguageContext } from '@/config/app-language-context';
import { CaptureLeadsForm } from './capture-leads-form';

export async function CapturePlanLeads() {
  const language = await getAppLanguageAction();
  const { plansSection } = getLanguageContext(language);

  return (
    <div className="border rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <h2 className="text-xl font-bold">{plansSection.getPremiumAccess}</h2>
      <p className="text-muted-foreground text-sm tracking-tighter">
        {plansSection.getPremiumAccessDescription}
      </p>

      <CaptureLeadsForm plansSection={plansSection} />
    </div>
  );
}
