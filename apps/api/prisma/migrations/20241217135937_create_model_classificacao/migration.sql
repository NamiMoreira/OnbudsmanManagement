-- CreateTable
CREATE TABLE "classificacao" (
    "classificacao_id" SERIAL NOT NULL,
    "classificacao_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classificacao_pkey" PRIMARY KEY ("classificacao_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_classificacao_fkey" FOREIGN KEY ("classificacao") REFERENCES "classificacao"("classificacao_id") ON DELETE RESTRICT ON UPDATE CASCADE;
