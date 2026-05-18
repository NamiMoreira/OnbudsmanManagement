/*
  Warnings:

  - Added the required column `role` to the `role_description` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "role_description" ADD COLUMN     "role" INTEGER NOT NULL;
