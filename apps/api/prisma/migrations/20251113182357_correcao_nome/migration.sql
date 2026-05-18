/*
  Warnings:

  - You are about to drop the column `observação_interna` on the `occurrence` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "observação_interna",
ADD COLUMN     "observacao_interna" TEXT;
