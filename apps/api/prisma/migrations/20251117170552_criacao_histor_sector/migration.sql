-- AlterTable
ALTER TABLE "user" ADD COLUMN     "sector_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histor_sector" (
    "id" SERIAL NOT NULL,
    "protocol" TEXT NOT NULL,
    "sector_origin" INTEGER NOT NULL DEFAULT 0,
    "sector_destiny" INTEGER NOT NULL DEFAULT 0,
    "date_send" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_send" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "histor_sector_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "histor_sector_protocol_key" ON "histor_sector"("protocol");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
