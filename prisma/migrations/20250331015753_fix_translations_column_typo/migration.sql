/*
  Warnings:

  - You are about to drop the column `discarted` on the `translations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "translations" DROP COLUMN "discarted",
ADD COLUMN     "discarded" BOOLEAN NOT NULL DEFAULT false;
