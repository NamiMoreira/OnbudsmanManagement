/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fkey" FOREIGN KEY ("role") REFERENCES "role_description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
