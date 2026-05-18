/*
  Warnings:

  - You are about to drop the `canal_interno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_canal_interno_fkey";

-- DropTable
DROP TABLE "canal_interno";

-- CreateTable
CREATE TABLE "setor_interno" (
    "canal_interno" SERIAL NOT NULL,
    "canal_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "setor_interno_pkey" PRIMARY KEY ("canal_interno")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_canal_interno_fkey" FOREIGN KEY ("canal_interno") REFERENCES "setor_interno"("canal_interno") ON DELETE RESTRICT ON UPDATE CASCADE;
