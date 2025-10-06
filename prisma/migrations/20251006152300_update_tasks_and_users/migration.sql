-- AlterTable
ALTER TABLE "public"."employees" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."tasks" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;
