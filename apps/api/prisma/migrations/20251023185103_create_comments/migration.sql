-- AlterTable
ALTER TABLE "occurrence" ADD COLUMN     "comment_id" INTEGER;

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" SERIAL NOT NULL,
    "occurrence_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comment_occurrence_id_key" ON "comment"("occurrence_id");

-- AddForeignKey
ALTER TABLE "occurrence" ADD CONSTRAINT "occurrence_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("occurrence_id") ON DELETE SET NULL ON UPDATE CASCADE;
