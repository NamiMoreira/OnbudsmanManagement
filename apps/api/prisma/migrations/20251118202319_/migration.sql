-- DropForeignKey
ALTER TABLE "occurrence" DROP CONSTRAINT "occurrence_comment_id_fkey";

-- DropIndex
DROP INDEX "comment_occurrence_id_key";
