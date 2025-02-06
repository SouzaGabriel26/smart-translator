"use server";

import { auth } from "@/models/auth";
import type { SignInProps } from "@/types/sign-in";
import type { SignUpProps } from "@/types/sign-up";

export async function signUpAction(data: SignUpProps) {
  const result = await auth.signUp(data);

  // TODO: handle result
  // 1. add toast to show error or success message
  // 2. redirect to sign-in page if success
  console.log({ result });

  return {};
}

export async function signInAction(data: SignInProps) {
  const result = await auth.signIn(data);

  // TODO: handle result
  // 1. add toast to show error or success message
  // 2. redirect to dashboard page if success
  console.log({ result });

  return {};
}
