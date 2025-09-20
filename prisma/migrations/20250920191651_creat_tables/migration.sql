-- CreateEnum
CREATE TYPE "public"."GenderEmployeeEnum" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."CargoEmployeeEnum" AS ENUM ('PREFEITO', 'SECRETARIO', 'DIRETOR', 'TECNICO', 'COORDENADOR');

-- CreateEnum
CREATE TYPE "public"."StatusTaskEnum" AS ENUM ('A_FAZER', 'ANDAMENTO', 'CONCLUIDA', 'EXPIRADA');

-- CreateEnum
CREATE TYPE "public"."PriorityTaskEnum" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "public"."StatusMarkEnum" AS ENUM ('AGENDADO', 'REAGENDADO', 'ADIADO', 'ENCERRADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "public"."employees" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "public"."GenderEmployeeEnum" NOT NULL DEFAULT 'OUTRO',
    "phone" TEXT NOT NULL,
    "cargo" "public"."CargoEmployeeEnum" NOT NULL DEFAULT 'SECRETARIO',
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tasks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "missionTask" TEXT NOT NULL,
    "descriptionTask" TEXT NOT NULL,
    "deadlineTask" TIMESTAMP(3) NOT NULL,
    "statusTask" "public"."StatusTaskEnum" NOT NULL DEFAULT 'A_FAZER',
    "PriorityTask" "public"."PriorityTaskEnum" NOT NULL DEFAULT 'BAIXA',

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."marks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motiveMark" TEXT NOT NULL,
    "descriptionMark" TEXT NOT NULL,
    "localMark" TEXT NOT NULL,
    "prazoMark" TIMESTAMP(3) NOT NULL,
    "statusMark" "public"."StatusMarkEnum" NOT NULL DEFAULT 'AGENDADO',

    CONSTRAINT "marks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nameDepartment" TEXT NOT NULL,
    "sectorDepartment" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_username_key" ON "public"."employees"("username");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "public"."employees"("email");
