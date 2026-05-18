-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "ocurrence_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "user_created" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);
