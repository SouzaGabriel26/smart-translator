'use client';

import { getGithubOAuthUrl } from '@/actions/oauth/githubAuth';
import { getGoogleOAuthUrl } from '@/actions/oauth/googleAuth';
import { signInAction } from '@/app/(public)/auth/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { AppLanguageContext } from '@/config/app-language-context';
import type { AvailableLanguages } from '@/config/constants';
import { cn } from '@/lib/utils';
import { signInSchema } from '@/types/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { GithubLogo } from './github-logo';
import { GoogleLogo } from './google-logo';
import { PasswordInput } from './password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

type FormData = z.infer<typeof signInSchema>;

type SignInFormProps = ComponentPropsWithRef<'div'> & {
  appLanguageContext: AppLanguageContext;
  language: AvailableLanguages;
};

export function SignInForm({
  appLanguageContext,
  language,
  className,
  ...props
}: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const { error } = await signInAction(data);

    if (error) {
      toast.error(JSON.parse(JSON.stringify(error)));
      setIsLoading(false);
      return;
    }

    toast.success(appLanguageContext.auth.signedInSuccessfully);
    setIsLoading(false);
    route.push('/dashboard');
  }

  function onGoogleSignIn() {
    setIsLoading(true);
    const authUrl = getGoogleOAuthUrl();
    route.push(authUrl);
    setIsLoading(false);
  }

  function onGithubSignIn() {
    setIsLoading(true);
    const authUrl = getGithubOAuthUrl();
    route.push(authUrl);
    setIsLoading(false);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {appLanguageContext.signInLabel}
          </CardTitle>
          <CardDescription>
            {appLanguageContext.auth.signInDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'en' ? 'Password' : 'Senha'}
                      </FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full text-white"
                >
                  {appLanguageContext.signInLabel}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {appLanguageContext.auth.doNotHaveAccount}{' '}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  {appLanguageContext.signUpLabel}
                </Link>
              </div>
            </form>
          </Form>

          <Button
            disabled={isLoading}
            onClick={onGoogleSignIn}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <GoogleLogo className="size-6" />
            {appLanguageContext.oauth.google}
          </Button>

          <Button
            disabled={isLoading}
            onClick={onGithubSignIn}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <GithubLogo className="size-6 dark:fill-white" />
            {appLanguageContext.oauth.github}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
