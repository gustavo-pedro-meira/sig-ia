/*
  Warnings:

  - You are about to drop the column `PriorityTask` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "PriorityTask",
ADD COLUMN     "priorityTask" "public"."PriorityTaskEnum" NOT NULL DEFAULT 'Baixa';
