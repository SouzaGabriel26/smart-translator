import { z } from 'zod';

export type SignUpProps = z.infer<typeof signUpSchema>;

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
