/*
  Warnings:

  - The primary key for the `occurrence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `setor_interno` on the `occurrence` table. All the data in the column will be lost.
  - You are about to drop the column `setor_interno` on the `setor_interno` table. All the data in the column will be lost.

*/

-- CreateEnum
CREATE TYPE "StatusOportunidade" AS ENUM (
    'PENDENTE',
    'EM_ANALISE',
    'AGUARDANDO_RETORNO',
    'CONCLUIDO',
    'ARQUIVADO',
    'REJEITADO'
);

-- DropForeignKey
ALTER TABLE "occurrence"
DROP CONSTRAINT "occurrence_setor_interno_fkey";

-- =========================================
-- OCCURRENCE
-- =========================================

ALTER TABLE "occurrence"
DROP CONSTRAINT "occurrence_pkey";

ALTER TABLE "occurrence"
DROP COLUMN "setor_interno",
ADD COLUMN "resolucao" TEXT NOT NULL DEFAULT '',
ADD COLUMN "setor_interno_id" INTEGER NOT NULL DEFAULT 1;

-- Se realmente precisar alterar o tipo:
ALTER TABLE "occurrence"
ALTER COLUMN "id" TYPE INTEGER;

ALTER TABLE "occurrence"
ADD CONSTRAINT "occurrence_pkey" PRIMARY KEY ("id");

-- =========================================
-- SETOR_INTERNO
-- =========================================

ALTER TABLE "setor_interno"
DROP CONSTRAINT "setor_interno_pkey";

ALTER TABLE "setor_interno"
DROP COLUMN "setor_interno",
ADD COLUMN "setor_interno_id" INTEGER NOT NULL;

ALTER TABLE "setor_interno"
ADD CONSTRAINT "setor_interno_pkey"
PRIMARY KEY ("setor_interno_id");

-- =========================================
-- USER RECOVERY
-- =========================================

CREATE TABLE "UserRecovery" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserRecovery_pkey"
    PRIMARY KEY ("id")
);

-- =========================================
-- OPORTUNIDADES
-- =========================================

CREATE TABLE "oportunidades_melhoria" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome_respondente" TEXT NOT NULL,
    "data_notificacao" TIMESTAMP(3),
    "protocolo_ouvidoria" TEXT,
    "protocolo_primeira_instancia" TEXT,
    "nome_cliente_demandante" TEXT,
    "data_ocorrencia" TIMESTAMP(3),
    "tipo_atendimento" TEXT,
    "nome_cliente_atendido" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "convenio" TEXT,
    "descricao_manifestacao" TEXT NOT NULL,
    "investigacao_ocorrido" TEXT,
    "ocorrencia_recorrente" BOOLEAN,
    "acao_imediata" TEXT,
    "area_envolvida" TEXT,
    "responsavel_registro" TEXT,
    "data_registro" TIMESTAMP(3),
    "procede" BOOLEAN,
    "justificativa" TEXT,
    "analise_causa_raiz" TEXT,
    "retorno_cliente" TEXT,
    "nome_contato" TEXT,
    "data_retorno" TIMESTAMP(3),
    "hora_retorno" TEXT,
    "canal_retorno" TEXT,
    "feedback_cliente" TEXT,
    "pertinente" BOOLEAN,
    "status" "StatusOportunidade" NOT NULL DEFAULT 'PENDENTE',
    "enviado_por" TEXT,

    CONSTRAINT "oportunidades_melhoria_pkey"
    PRIMARY KEY ("id")
);

-- =========================================
-- PLANOS ACAO
-- =========================================

CREATE TABLE "planos_acao" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "oportunidade_id" TEXT NOT NULL,
    "o_que_fazer" TEXT,
    "como_fazer" TEXT,
    "quando_fazer" TEXT,
    "onde_fazer" TEXT,
    "responsavel" TEXT,
    "status_previsto" TEXT,
    "status_realizado" TEXT,
    "evidencias" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "planos_acao_pkey"
    PRIMARY KEY ("id")
);

-- =========================================
-- ANEXOS
-- =========================================

CREATE TABLE "anexos" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oportunidade_id" TEXT NOT NULL,
    "nome_original" TEXT NOT NULL,
    "nome_armazenado" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "anexos_pkey"
    PRIMARY KEY ("id")
);

-- =========================================
-- HISTORICO
-- =========================================

CREATE TABLE "historico_oportunidades" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oportunidade_id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "descricao" TEXT,
    "usuario" TEXT,
    "dados_anteriores" JSONB,

    CONSTRAINT "historico_oportunidades_pkey"
    PRIMARY KEY ("id")
);

-- =========================================
-- INDEXES
-- =========================================

CREATE UNIQUE INDEX "UserRecovery_id_key"
ON "UserRecovery"("id");

CREATE INDEX "oportunidades_melhoria_createdAt_idx"
ON "oportunidades_melhoria"("createdAt");

CREATE INDEX "oportunidades_melhoria_protocolo_ouvidoria_idx"
ON "oportunidades_melhoria"("protocolo_ouvidoria");

CREATE INDEX "oportunidades_melhoria_status_idx"
ON "oportunidades_melhoria"("status");

CREATE INDEX "planos_acao_oportunidade_id_idx"
ON "planos_acao"("oportunidade_id");

CREATE INDEX "anexos_oportunidade_id_idx"
ON "anexos"("oportunidade_id");

CREATE INDEX "historico_oportunidades_oportunidade_id_idx"
ON "historico_oportunidades"("oportunidade_id");

CREATE INDEX "historico_oportunidades_createdAt_idx"
ON "historico_oportunidades"("createdAt");

-- =========================================
-- FOREIGN KEYS
-- =========================================

ALTER TABLE "user"
ADD CONSTRAINT "user_sector_id_fkey"
FOREIGN KEY ("sector_id")
REFERENCES "sector"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "occurrence"
ADD CONSTRAINT "occurrence_setor_interno_id_fkey"
FOREIGN KEY ("setor_interno_id")
REFERENCES "setor_interno"("setor_interno_id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

ALTER TABLE "planos_acao"
ADD CONSTRAINT "planos_acao_oportunidade_id_fkey"
FOREIGN KEY ("oportunidade_id")
REFERENCES "oportunidades_melhoria"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "anexos"
ADD CONSTRAINT "anexos_oportunidade_id_fkey"
FOREIGN KEY ("oportunidade_id")
REFERENCES "oportunidades_melhoria"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE "historico_oportunidades"
ADD CONSTRAINT "historico_oportunidades_oportunidade_id_fkey"
FOREIGN KEY ("oportunidade_id")
REFERENCES "oportunidades_melhoria"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;