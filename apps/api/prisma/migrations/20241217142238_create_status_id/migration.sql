/*
  Warnings:

  - You are about to drop the column `status` on the `occurrence` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `occurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "occurrence" DROP COLUMN "status",
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "status" (
    "status_id" SERIAL NOT NULL,
    "status_nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("status_id")
);

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;
