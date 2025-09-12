import { checkUserAction } from "@/actions/auth/check-user";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

import "dotenv/config";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await checkUserAction();

  return (
    <div className="h-full flex flex-col">
      <Header user={user} />

      <LanguageProvider>{children}</LanguageProvider>
    </div>
  );
}
