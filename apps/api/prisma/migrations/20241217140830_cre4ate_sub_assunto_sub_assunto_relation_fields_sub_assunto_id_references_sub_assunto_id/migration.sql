/*
  Warnings:

  - You are about to drop the column `sub_assunto` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `sub_assunto_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "sub_assunto",
ADD COLUMN     "sub_assunto_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sub_assunto" (
    "sub_assunto_id" SERIAL NOT NULL,
    "asub_assunto_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sub_assunto_pkey" PRIMARY KEY ("sub_assunto_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_sub_assunto_id_fkey" FOREIGN KEY ("sub_assunto_id") REFERENCES "sub_assunto"("sub_assunto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
