-- CreateTable
CREATE TABLE "role_description" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_description_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fkey" FOREIGN KEY ("role") REFERENCES "role_description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
