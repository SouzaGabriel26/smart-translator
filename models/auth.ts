import { prismaClient } from "@/lib/prisma-client";
import { type SignInProps, signInSchema } from "@/types/sign-in";
import { type SignUpProps, signUpSchema } from "@/types/sign-up";
import bcrypt from "bcrypt";

import { SignJWT } from "jose";

async function signUp(input: SignUpProps) {
  const { data, error } = signUpSchema.safeParse(input);

  if (error) {
    return { error: error.message };
  }

  const { email, name, password } = data;

  const userAlreadyExists = await prismaClient.users.findUnique({
    where: { email },
  });

  if (userAlreadyExists) {
    return { error: "User already exists!" };
  }

  const SALT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT);

  await prismaClient.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return {
    message: "User created successfully!",
  };
}

async function signIn(input: SignInProps) {
  const { data, error } = signInSchema.safeParse(input);

  if (error) {
    return { error: error.message };
  }

  const { email, password } = data;

  const user = await prismaClient.users.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid credentials!" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Invalid credentials!" };
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({ sub: user.id })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);

  return { token };
}

export const auth = Object.freeze({
  signUp,
  signIn,
});
