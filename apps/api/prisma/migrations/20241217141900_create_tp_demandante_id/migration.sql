/*
  Warnings:

  - You are about to drop the column `tp_demandante` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `tp_demandante_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "tp_demandante",
ADD COLUMN     "tp_demandante_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tp_demandante" (
    "tp_demandante_id" SERIAL NOT NULL,
    "tp_demandante_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tp_demandante_pkey" PRIMARY KEY ("tp_demandante_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_tp_demandante_id_fkey" FOREIGN KEY ("tp_demandante_id") REFERENCES "tp_demandante"("tp_demandante_id") ON DELETE RESTRICT ON UPDATE CASCADE;
