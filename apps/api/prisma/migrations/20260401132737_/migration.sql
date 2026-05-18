/*
  Warnings:

  - The primary key for the `occurrence` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/

ALTER TABLE "occurrence"
DROP CONSTRAINT "occurrence_pkey";

ALTER TABLE "occurrence"
ALTER COLUMN "id" TYPE BIGINT;

ALTER TABLE "occurrence"
ADD CONSTRAINT "occurrence_pkey" PRIMARY KEY ("id");