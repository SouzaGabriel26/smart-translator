'use client';

import { createNotificationAction } from '@/actions/create-notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { type JSX, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const notificationSchema = z.object({
  name: z.string().min(5, 'Name must have at least 5 characters.'),
  description: z
    .string()
    .min(5, 'Description must have at least 5 characters.'),
  expirationDate: z.date().min(tomorrow, 'Date must be in the future.'),
});

export type Notification = z.infer<typeof notificationSchema>;

type CreateNotificationButtonProps = JSX.IntrinsicElements['button'] & {
  modalTitle: string;
};

export function CreateNotificationButton({
  modalTitle,
  children,
  ...props
}: CreateNotificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Notification>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      name: '',
      description: '',
      expirationDate: tomorrow,
    },
  });

  async function handleSubmit(data: Notification) {
    setIsLoading(true);

    await createNotificationAction(data);
    form.reset();
    toast.success('Notification created successfully!');

    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild {...props}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <div className="flex flex-col items-center justify-center">
            <form
              className="flex flex-col gap-4 pt-4 max-w-[400px] w-full"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter notification name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        maxLength={500}
                        placeholder="Enter a detailed description..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        min={tomorrow.toISOString().split('T')[0]}
                        value={field.value.toISOString().split('T')[0]}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-2 text-white"
                disabled={!form.formState.isValid || isLoading}
              >
                {isLoading ? 'Creating Notification' : 'Create Notification'}
              </Button>
            </form>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
