-- CreateTable
CREATE TABLE "occurrence" (
    "id" SERIAL NOT NULL,
    "reanalise" BOOLEAN NOT NULL DEFAULT false,
    "classificacao" INTEGER NOT NULL,
    "unidade" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "cartao_beneficiario" TEXT NOT NULL,
    "manifestacao_ant" TEXT NOT NULL,
    "identificacao_id" INTEGER NOT NULL,
    "forma_resposta" INTEGER NOT NULL,
    "assunto" INTEGER NOT NULL,
    "sub_assunto" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "tp_contrato" INTEGER NOT NULL,
    "tp_demandante" INTEGER NOT NULL,
    "canal" INTEGER NOT NULL,
    "desmembrar" BOOLEAN NOT NULL DEFAULT false,
    "status" INTEGER NOT NULL,
    "prazo_final" TIMESTAMP(3) NOT NULL,
    "prazo_interno" TIMESTAMP(3) NOT NULL,
    "anexo" BOOLEAN NOT NULL,
    "receptor" INTEGER NOT NULL,
    "usuario_atualizacao" INTEGER NOT NULL,
    "protocolo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "occurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identificacao_occurrence" (
    "identificacao_id" SERIAL NOT NULL,
    "identificacao_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identificacao_occurrence_pkey" PRIMARY KEY ("identificacao_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_identificacao_id_fkey" FOREIGN KEY ("identificacao_id") REFERENCES "identificacao_occurrence"("identificacao_id") ON DELETE RESTRICT ON UPDATE CASCADE;
