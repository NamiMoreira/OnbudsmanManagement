/*
  Warnings:

  - You are about to drop the column `classificacao` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `unidade` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `classificacao_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_classificacao_fkey";

-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "classificacao",
DROP COLUMN "unidade",
ADD COLUMN     "classificacao_id" INTEGER NOT NULL,
ADD COLUMN     "unidade_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "unidade" (
    "unidade_id" SERIAL NOT NULL,
    "unidade_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unidade_pkey" PRIMARY KEY ("unidade_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_classificacao_id_fkey" FOREIGN KEY ("classificacao_id") REFERENCES "classificacao"("classificacao_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_unidade_id_fkey" FOREIGN KEY ("unidade_id") REFERENCES "unidade"("unidade_id") ON DELETE RESTRICT ON UPDATE CASCADE;
