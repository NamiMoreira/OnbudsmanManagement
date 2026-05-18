-- AlterTable
ALTER TABLE "occurrence" ADD COLUMN     "canal_interno" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "canal_interno" (
    "canal_interno" SERIAL NOT NULL,
    "canal_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "canal_interno_pkey" PRIMARY KEY ("canal_interno")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_canal_interno_fkey" FOREIGN KEY ("canal_interno") REFERENCES "canal_interno"("canal_interno") ON DELETE RESTRICT ON UPDATE CASCADE;
