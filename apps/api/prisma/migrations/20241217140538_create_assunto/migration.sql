/*
  Warnings:

  - You are about to drop the column `assunto` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `assunto_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "assunto",
ADD COLUMN     "assunto_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "assunto" (
    "assunto_id" SERIAL NOT NULL,
    "assunto_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assunto_pkey" PRIMARY KEY ("assunto_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_assunto_id_fkey" FOREIGN KEY ("assunto_id") REFERENCES "assunto"("assunto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
