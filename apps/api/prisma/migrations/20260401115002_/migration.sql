/*
  Warnings:

  - You are about to drop the column `assunto_id` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `classificacao_id` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `desmembrar` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `forma_resposta_id` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `identificacao_id` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `sub_assunto_id` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the `assunto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classificacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forma_resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `identificacao_occurrence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_assunto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_assunto_id_fkey";

-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_classificacao_id_fkey";

-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_forma_resposta_id_fkey";

-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_identificacao_id_fkey";

-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_sub_assunto_id_fkey";

-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "assunto_id",
DROP COLUMN "classificacao_id",
DROP COLUMN "desmembrar",
DROP COLUMN "forma_resposta_id",
DROP COLUMN "identificacao_id",
DROP COLUMN "sub_assunto_id",
ADD COLUMN     "objetivo" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "assunto";

-- DropTable
DROP TABLE "classificacao";

-- DropTable
DROP TABLE "forma_resposta";

-- DropTable
DROP TABLE "identificacao_occurrence";

-- DropTable
DROP TABLE "sub_assunto";
