/*
  Warnings:

  - You are about to drop the column `nameDepartment` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `sectorDepartment` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `cargo` on the `employees` table. All the data in the column will be lost.
  - The `gender` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deadlineTask` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionTask` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `missionTask` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `priorityTask` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `statusTask` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `marks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `departments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('Cabinet', 'Secretary', 'Technician1', 'Technician2', 'Technician3');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('ToDo', 'InProgress', 'Completed', 'Expired');

-- CreateEnum
CREATE TYPE "public"."TaskPriority" AS ENUM ('Low', 'Medium', 'High', 'Urgent');

-- CreateEnum
CREATE TYPE "public"."AppointmentStatus" AS ENUM ('Scheduled', 'Rescheduled', 'Postponed', 'Closed', 'Cancelled');

-- AlterTable
ALTER TABLE "public"."departments" DROP COLUMN "nameDepartment",
DROP COLUMN "sectorDepartment",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."employees" DROP COLUMN "cargo",
ADD COLUMN     "position" "public"."Position" NOT NULL DEFAULT 'Secretary',
DROP COLUMN "gender",
ADD COLUMN     "gender" "public"."Gender" NOT NULL DEFAULT 'Other';

-- AlterTable
ALTER TABLE "public"."tasks" DROP COLUMN "deadlineTask",
DROP COLUMN "descriptionTask",
DROP COLUMN "missionTask",
DROP COLUMN "priorityTask",
DROP COLUMN "statusTask",
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hour" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minute" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "priority" "public"."TaskPriority" NOT NULL DEFAULT 'Low',
ADD COLUMN     "status" "public"."TaskStatus" NOT NULL DEFAULT 'ToDo',
ADD COLUMN     "title" TEXT,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "public"."marks";

-- DropEnum
DROP TYPE "public"."CargoEmployeeEnum";

-- DropEnum
DROP TYPE "public"."GenderEmployeeEnum";

-- DropEnum
DROP TYPE "public"."PriorityTaskEnum";

-- DropEnum
DROP TYPE "public"."StatusMarkEnum";

-- DropEnum
DROP TYPE "public"."StatusTaskEnum";

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "public"."AppointmentStatus" NOT NULL DEFAULT 'Scheduled',
    "hour" INTEGER NOT NULL DEFAULT 0,
    "minute" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appointments" ADD CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
