-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_fkey";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_fkey" FOREIGN KEY ("role") REFERENCES "role_description"("id") ON DELETE CASCADE ON UPDATE CASCADE;
