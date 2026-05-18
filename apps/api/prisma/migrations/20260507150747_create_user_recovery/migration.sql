-- AlterTable
CREATE SEQUENCE setor_interno_setor_interno_id_seq;
ALTER TABLE "setor_interno" ALTER COLUMN "setor_interno_id" SET DEFAULT nextval('setor_interno_setor_interno_id_seq');
ALTER SEQUENCE setor_interno_setor_interno_id_seq OWNED BY "setor_interno"."setor_interno_id";
