/*
  Warnings:

  - You are about to drop the column `expires_at` on the `UserRecovery` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `UserRecovery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRecovery" DROP COLUMN "expires_at",
DROP COLUMN "user_email";
