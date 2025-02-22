import { prismaClient } from "@/lib/prisma-client";
import bcrypt from "bcrypt";

async function main() {
  await Promise.all([
    prismaClient.translationPhrases.deleteMany(),
    prismaClient.translations.deleteMany(),
    prismaClient.users.deleteMany(),
  ]);

  const SALT = 10;
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, SALT);

  const { id: userId } = await prismaClient.users.create({
    data: {
      email: "user@email.com",
      name: "User",
      password: hashedPassword,
    },
  });

  await prismaClient.$transaction([
    prismaClient.translations.create({
      data: {
        userId,
        languageFrom: "en",
        languageTo: "pt",
        targetWord: "hello",
        translatedWord: "olá",
        phrases: {
          createMany: {
            data: [
              {
                content: "Hello, how are you?",
                translatedContent: "Olá, como você está?",
              },
              {
                content: "Hello, world!",
                translatedContent: "Olá, mundo!",
              },
              {
                content: "Hello, everyone!",
                translatedContent: "Olá, pessoal!",
              },
            ],
          },
        },
      },
    }),
    prismaClient.translations.create({
      data: {
        userId,
        languageFrom: "en",
        languageTo: "pt",
        targetWord: "world",
        translatedWord: "mundo",
        phrases: {
          createMany: {
            data: [
              {
                content: "Hello, world!",
                translatedContent: "Olá, mundo!",
              },
              {
                content: "The world is big.",
                translatedContent: "O mundo é grande.",
              },
              {
                content: "The world is beautiful.",
                translatedContent: "O mundo é bonito.",
              },
            ],
          },
        },
      },
    }),
  ]);
}
main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
