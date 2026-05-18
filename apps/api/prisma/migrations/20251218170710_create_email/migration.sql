/*
  Warnings:

  - Added the required column `email` to the `sector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sector" ADD COLUMN     "email" TEXT NOT NULL;
