import { Header } from '@/components/header';
import { PlanCard } from '@/components/plan-card';
import { Button } from '@/components/ui/button';
import { getLanguageContext } from '@/config/app-language-context';
import { projectConstants } from '@/config/constants';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { getAppLanguageAction } from './actions';

export default async function Page() {
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  return (
    <div className="h-full">
      <Header />

      <main className="overvlow-x-hidden">
        {/* Hero */}
        <section
          id="hero"
          className="flex flex-col xl:flex-row py-12 md:py-32 px-10 gap-6"
        >
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h1 className="text-4xl md:text-7xl font-bold">
              {appLanguageContext.heroSection.title}
            </h1>

            <p className="text-muted-foreground">
              {appLanguageContext.heroSection.description}
            </p>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  {appLanguageContext.heroSection.getStartedLabel}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#plans">
                  {appLanguageContext.heroSection.viewPlansLabel}
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 px-4 py-2 md:pb-5">
              <video
                className="w-full h-full rounded-lg hidden md:block"
                controls
              >
                <source src="/demo_desktop.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>

              <video className="w-full h-full rounded-lg md:hidden" controls>
                <source src="/demo_mobile.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-12 md:py-32 px-10">
          <div className="text-center space-y-4">
            <h2 className="w-full text-4xl md:text-6xl font-bold">
              {appLanguageContext.featuresSection.title}
            </h2>

            <p className="text-muted-foreground">
              {appLanguageContext.featuresSection.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start mt-10">
            {projectConstants.features[language].map((feature) => (
              <div key={feature.title} className="max-w-72 text-center">
                <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit">
                  <feature.icon />
                </div>
                <strong className="text-lg">{feature.title}</strong>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="py-12 md:py-32 px-10 space-y-6">
          <div className="text-center space-y-4">
            <h3 className="w-full text-4xl md:text-6xl font-bold">
              {appLanguageContext.plansSection.title}
            </h3>

            <p className="text-muted-foreground">
              {appLanguageContext.plansSection.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {projectConstants.plans[language].map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40 py-6 md:py-8 px-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <span className="flex gap-2 text-2xl items-center font-medium">
          <Globe />
          {appLanguageContext.title}
        </span>

        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} {appLanguageContext.footer.reserved}
        </p>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:underline text-center">
            {appLanguageContext.footer.serviceTerms}
          </Link>
          <Link href="#" className="hover:underline text-center">
            {appLanguageContext.footer.privacyPolicy}
          </Link>
          <Link href="#" className="hover:underline text-center">
            {appLanguageContext.footer.contact}
          </Link>
        </div>
      </footer>
    </div>
  );
}
