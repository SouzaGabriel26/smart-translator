'use client';

import { signUpAction } from '@/app/(public)/auth/actions';
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
import { signUpSchema } from '@/types/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { PasswordInput } from './password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

type FormData = z.infer<typeof signUpSchema>;

type SigUpFormProps = ComponentPropsWithRef<'div'> & {
  appLanguageContext: AppLanguageContext;
  language: AvailableLanguages;
};

export function SignUpForm({
  appLanguageContext,
  language,
  className,
  ...props
}: SigUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const { error, message } = await signUpAction(data);

    if (error) {
      toast.error(JSON.parse(JSON.stringify(error)));
      setIsLoading(false);
      return;
    }

    toast.success(message);
    setIsLoading(false);
    route.push('/auth/sign-in');
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {appLanguageContext.signUpLabel}
          </CardTitle>
          <CardDescription>
            {appLanguageContext.auth.signUpDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'en' ? 'Username' : 'Nome de usuário'}
                      </FormLabel>
                      <FormControl>
                        <Input required placeholder="Jonh Doe" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
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
                  {appLanguageContext.signUpLabel}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {appLanguageContext.auth.alreadyHaveAccount}{' '}
                <Link
                  href="/auth/sign-in"
                  className="underline underline-offset-4"
                >
                  {appLanguageContext.signInLabel}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
