-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_comment_id_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "occurrence_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "occurrence" ALTER COLUMN "comment_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("occurrence_id") ON DELETE SET NULL ON UPDATE CASCADE;
