/*
  Warnings:

  - You are about to drop the column `forma_resposta` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `forma_resposta_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "forma_resposta",
ADD COLUMN     "forma_resposta_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "forma_resposta" (
    "forma_resposta_id" SERIAL NOT NULL,
    "resposta_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forma_resposta_pkey" PRIMARY KEY ("forma_resposta_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_forma_resposta_id_fkey" FOREIGN KEY ("forma_resposta_id") REFERENCES "forma_resposta"("forma_resposta_id") ON DELETE RESTRICT ON UPDATE CASCADE;
