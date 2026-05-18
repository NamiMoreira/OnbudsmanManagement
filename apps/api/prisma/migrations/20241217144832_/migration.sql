/*
  Warnings:

  - A unique constraint covering the columns `[protocolo]` on the table `occurrence` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "occurrence_protocolo_key" ON "occurrence"("protocolo");
