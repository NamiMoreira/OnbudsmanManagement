/*
  Warnings:

  - Changed the type of `sector_origin` on the `histor_sector` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sector_destiny` on the `histor_sector` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "histor_sector" DROP COLUMN "sector_origin",
ADD COLUMN     "sector_origin" INTEGER NOT NULL,
DROP COLUMN "sector_destiny",
ADD COLUMN     "sector_destiny" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sector" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "histor_sector" ADD CONSTRAINT "histor_sector_sector_origin_fkey" FOREIGN KEY ("sector_origin") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histor_sector" ADD CONSTRAINT "histor_sector_sector_destiny_fkey" FOREIGN KEY ("sector_destiny") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
