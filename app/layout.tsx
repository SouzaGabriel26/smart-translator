import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="antialiased h-full bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
