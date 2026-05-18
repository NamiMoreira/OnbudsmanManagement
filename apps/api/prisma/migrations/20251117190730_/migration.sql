-- AlterTable
ALTER TABLE "histor_sector" ALTER COLUMN "sector_origin" DROP DEFAULT,
ALTER COLUMN "sector_origin" SET DATA TYPE TEXT,
ALTER COLUMN "sector_destiny" DROP DEFAULT,
ALTER COLUMN "sector_destiny" SET DATA TYPE TEXT;
