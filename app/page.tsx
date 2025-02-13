import { checkUserAction } from "@/actions/auth/check-user";
import { GenerateTranslationForm } from "@/components/generate-translation-form";

export default async function Page() {
  const user = await checkUserAction();

  return (
    <div className="h-full grid place-items-center">
      <div className="h-full flex flex-col items-center justify-center">
        <h1>
          Hello, {user.name}
        </h1>

        <GenerateTranslationForm />
      </div>
    </div>
  );
}
