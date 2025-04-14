import { isLoggedIn } from '@/actions/auth/check-user';
import { AppSidebar } from '@/components/app-sidebar';
import { ChangeLanguageButton } from '@/components/change-language-button';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { getLanguageContext } from '@/config/app-language-context';
import type { Metadata } from 'next';
import { getAppLanguageAction } from './actions';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Translator | Translate & Learn with AI',
  description:
    'Smart Translator is an AI-powered tool to translate words or phrases and generate contextual examples to boost your learning.',
  keywords: [
    'Smart Translator',
    'AI Translator',
    'English Portuguese Translator',
    'Learn English',
    'Translate with examples',
    'AI language tool',
    'Next.js Translator App',
  ],
  authors: [
    { name: 'Gabriel Souza', url: 'https://www.github.com/souzagabriel26' },
  ],
  creator: 'Gabriel Souza',
  metadataBase: new URL('https://smart-translator-ai.vercel.app'),
  openGraph: {
    title: 'Smart Translator | Translate & Learn with AI',
    description:
      'Translate short texts and get contextual phrases to help you understand and memorize.',
    url: 'https://smart-translator-ai.vercel.app',
    siteName: 'Smart Translator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart Translator Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Translator | Translate & Learn with AI',
    description:
      'Translate words or phrases and get smart contextual examples to retain what you learn.',
    creator: '@souzagabriel26_',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogged = await isLoggedIn();
  const language = await getAppLanguageAction();
  const appLanguageContext = getLanguageContext(language);

  return (
    <html lang="en" className="h-screen" suppressHydrationWarning>
      <body className="antialiased h-full">
        <SidebarProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            disableTransitionOnChange
          >
            {isLogged ? (
              <>
                <AppSidebar
                  sidebarLanguage={appLanguageContext.sidebar}
                  appTitle={appLanguageContext.title}
                  userIsAdmin={isLogged.role === 'ADMIN'}
                />

                <SidebarInset className="bg-background h-full">
                  {children}
                </SidebarInset>
              </>
            ) : (
              <div className="w-full">{children}</div>
            )}
            <Toaster />
            <ChangeLanguageButton />
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
