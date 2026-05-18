-- AlterTable
ALTER TABLE "occurrence" ALTER COLUMN "anexo" SET DEFAULT false,
ALTER COLUMN "receptor" DROP NOT NULL,
ALTER COLUMN "usuario_atualizacao" SET DEFAULT 1,
ALTER COLUMN "status_id" SET DEFAULT 1;
