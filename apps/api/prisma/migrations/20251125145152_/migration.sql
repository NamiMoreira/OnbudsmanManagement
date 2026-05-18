/*
  Warnings:

  - You are about to drop the column `canal_interno` on the `occurrence` table. All the data in the column will be lost.
  - The primary key for the `setor_interno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `canal_interno` on the `setor_interno` table. All the data in the column will be lost.
  - You are about to drop the column `canal_nome` on the `setor_interno` table. All the data in the column will be lost.
  - Added the required column `setor_nome` to the `setor_interno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_canal_interno_fkey";

-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "canal_interno",
ADD COLUMN     "setor_interno" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "setor_interno" DROP CONSTRAINT "setor_interno_pkey",
DROP COLUMN "canal_interno",
DROP COLUMN "canal_nome",
ADD COLUMN     "setor_interno" SERIAL NOT NULL,
ADD COLUMN     "setor_nome" TEXT NOT NULL,
ADD CONSTRAINT "setor_interno_pkey" PRIMARY KEY ("setor_interno");

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_setor_interno_fkey" FOREIGN KEY ("setor_interno") REFERENCES "setor_interno"("setor_interno") ON DELETE RESTRICT ON UPDATE CASCADE;
