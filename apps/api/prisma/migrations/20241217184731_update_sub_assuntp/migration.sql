/*
  Warnings:

  - You are about to drop the column `asub_assunto_nome` on the `sub_assunto` table. All the data in the column will be lost.
  - Added the required column `sub_assunto_nome` to the `sub_assunto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_assunto" DROP COLUMN "asub_assunto_nome",
ADD COLUMN     "sub_assunto_nome" TEXT NOT NULL;
