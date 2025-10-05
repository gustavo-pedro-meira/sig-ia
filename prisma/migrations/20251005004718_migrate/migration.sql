/*
  Warnings:

  - Made the column `deadline` on table `tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."tasks" ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
