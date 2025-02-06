import { z } from "zod";

export type SignInProps = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
