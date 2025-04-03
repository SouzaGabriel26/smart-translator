import { ChangeLanguageButton } from '@/components/change-language-button';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen" suppressHydrationWarning>
      <body className="antialiased h-full">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <div className="bg-background h-full">
            {children}
            <Toaster />

            <ChangeLanguageButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
