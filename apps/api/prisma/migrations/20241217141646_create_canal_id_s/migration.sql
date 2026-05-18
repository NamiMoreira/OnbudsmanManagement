/*
  Warnings:

  - You are about to drop the column `canal` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `canal_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "canal",
ADD COLUMN     "canal_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "canal" (
    "canal_id" SERIAL NOT NULL,
    "canal_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "canal_pkey" PRIMARY KEY ("canal_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_canal_id_fkey" FOREIGN KEY ("canal_id") REFERENCES "canal"("canal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
