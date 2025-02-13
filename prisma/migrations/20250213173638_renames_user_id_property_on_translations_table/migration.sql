/*
  Warnings:

  - You are about to drop the column `users_id` on the `translations` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "translations" DROP CONSTRAINT "translations_users_id_fkey";

-- AlterTable
ALTER TABLE "translations" DROP COLUMN "users_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
