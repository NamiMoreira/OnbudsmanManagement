/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "question" (
    "question_id" SERIAL NOT NULL,
    "ocurrence_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_pkey" PRIMARY KEY ("question_id")
);
