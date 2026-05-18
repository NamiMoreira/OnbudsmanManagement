/*
  Warnings:

  - You are about to alter the column `protocolo` on the `occurrence` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "occurrence" ALTER COLUMN "protocolo" SET DATA TYPE INTEGER;
