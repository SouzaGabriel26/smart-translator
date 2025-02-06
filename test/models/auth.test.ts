import { prismaClient } from "@/lib/prisma-client";
import { auth } from "@/models/auth";
import { randomUUID } from "node:crypto";

beforeAll(async () => {
  await prismaClient.users.deleteMany();
});

describe("models > auth", () => {
  describe("Invoking 'signUp' method", () => {
    it("should return an error when providing a invalid email input", async () => {
      const invalidEmail = "invalid-email";

      const result = await auth.signUp({
        email: invalidEmail,
        name: "John Doe",
        password: randomUUID(),
      });

      expect(result).toStrictEqual({
        error: {
          email: ["Invalid email"],
        },
      });
    });

    it("should return a successfull message when creating a new user", async () => {
      const result = await auth.signUp({
        email: "test@mail.com",
        name: "John Doe",
        password: randomUUID(),
      });

      expect(result).toStrictEqual({
        message: "User created successfully!",
      });
    });
  });

  describe("Invoking 'signIn' method", () => {
    it("should return an error when providing a non existing email", async () => {
      const result = await auth.signIn({
        email: "non-existing-email@mail.com",
        password: randomUUID(),
      });

      expect(result).toStrictEqual({
        error: "Invalid credentials!",
      });
    });

    it("should return an error when providing a wrong password", async () => {
      const email = "testemail@email.com";

      await auth.signUp({
        email,
        name: "John Doe",
        password: "123456",
      });

      const result = await auth.signIn({
        email,
        password: "wrong-password",
      });

      expect(result).toStrictEqual({
        error: "Invalid credentials!",
      });
    });

    it("should return a JWT token when providing valid properties", async () => {
      const email = "successfull@email.com";
      const password = "123456";

      await auth.signUp({
        email,
        name: "John Doe",
        password,
      });

      const result = await auth.signIn({
        email,
        password,
      });

      expect(result).toHaveProperty("token");
    });
  });
});
