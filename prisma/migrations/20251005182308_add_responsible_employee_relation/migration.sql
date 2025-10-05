-- AlterTable
ALTER TABLE "public"."appointments" ADD COLUMN     "userIdResponsible" TEXT;

-- AlterTable
ALTER TABLE "public"."tasks" ADD COLUMN     "userIdResponsible" TEXT;

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_userIdResponsible_fkey" FOREIGN KEY ("userIdResponsible") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_userIdResponsible_fkey" FOREIGN KEY ("userIdResponsible") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
