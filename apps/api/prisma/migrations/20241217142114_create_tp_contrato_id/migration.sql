/*
  Warnings:

  - You are about to drop the column `tp_contrato` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `tp_contrato_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "tp_contrato",
ADD COLUMN     "tp_contrato_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tp_contrato" (
    "tp_contrato_id" SERIAL NOT NULL,
    "tp_contrato_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tp_contrato_pkey" PRIMARY KEY ("tp_contrato_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_tp_contrato_id_fkey" FOREIGN KEY ("tp_contrato_id") REFERENCES "tp_contrato"("tp_contrato_id") ON DELETE RESTRICT ON UPDATE CASCADE;
