/*
  Warnings:

  - The values [PREFEITO,DIRETOR,TECNICO,COORDENADOR] on the enum `CargoEmployeeEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [MASCULINO,FEMININO,OUTRO] on the enum `GenderEmployeeEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [BAIXA,MEDIA,ALTA,URGENTE] on the enum `PriorityTaskEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [AGENDADO,REAGENDADO,ADIADO,ENCERRADO,CANCELADO] on the enum `StatusMarkEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [A_FAZER,ANDAMENTO,CONCLUIDA,EXPIRADA] on the enum `StatusTaskEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CargoEmployeeEnum_new" AS ENUM ('Prefeito', 'Secretario', 'Diretor', 'Tecnico', 'Coordenador');
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" DROP DEFAULT;
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" TYPE "public"."CargoEmployeeEnum_new" USING ("cargo"::text::"public"."CargoEmployeeEnum_new");
ALTER TYPE "public"."CargoEmployeeEnum" RENAME TO "CargoEmployeeEnum_old";
ALTER TYPE "public"."CargoEmployeeEnum_new" RENAME TO "CargoEmployeeEnum";
DROP TYPE "public"."CargoEmployeeEnum_old";
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" SET DEFAULT 'Secretario';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."GenderEmployeeEnum_new" AS ENUM ('Masculino', 'Feminino', 'Outro');
ALTER TABLE "public"."employees" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "public"."employees" ALTER COLUMN "gender" TYPE "public"."GenderEmployeeEnum_new" USING ("gender"::text::"public"."GenderEmployeeEnum_new");
ALTER TYPE "public"."GenderEmployeeEnum" RENAME TO "GenderEmployeeEnum_old";
ALTER TYPE "public"."GenderEmployeeEnum_new" RENAME TO "GenderEmployeeEnum";
DROP TYPE "public"."GenderEmployeeEnum_old";
ALTER TABLE "public"."employees" ALTER COLUMN "gender" SET DEFAULT 'Outro';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PriorityTaskEnum_new" AS ENUM ('Baixa', 'Media', 'Alta', 'Urgente');
ALTER TABLE "public"."tasks" ALTER COLUMN "PriorityTask" DROP DEFAULT;
ALTER TABLE "public"."tasks" ALTER COLUMN "PriorityTask" TYPE "public"."PriorityTaskEnum_new" USING ("PriorityTask"::text::"public"."PriorityTaskEnum_new");
ALTER TYPE "public"."PriorityTaskEnum" RENAME TO "PriorityTaskEnum_old";
ALTER TYPE "public"."PriorityTaskEnum_new" RENAME TO "PriorityTaskEnum";
DROP TYPE "public"."PriorityTaskEnum_old";
ALTER TABLE "public"."tasks" ALTER COLUMN "PriorityTask" SET DEFAULT 'Baixa';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusMarkEnum_new" AS ENUM ('Agendada', 'Reagendada', 'Adiada', 'Encerrada', 'Cancelada');
ALTER TABLE "public"."marks" ALTER COLUMN "statusMark" DROP DEFAULT;
ALTER TABLE "public"."marks" ALTER COLUMN "statusMark" TYPE "public"."StatusMarkEnum_new" USING ("statusMark"::text::"public"."StatusMarkEnum_new");
ALTER TYPE "public"."StatusMarkEnum" RENAME TO "StatusMarkEnum_old";
ALTER TYPE "public"."StatusMarkEnum_new" RENAME TO "StatusMarkEnum";
DROP TYPE "public"."StatusMarkEnum_old";
ALTER TABLE "public"."marks" ALTER COLUMN "statusMark" SET DEFAULT 'Agendada';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusTaskEnum_new" AS ENUM ('Fazer', 'Andamento', 'Concluida', 'Expirada');
ALTER TABLE "public"."tasks" ALTER COLUMN "statusTask" DROP DEFAULT;
ALTER TABLE "public"."tasks" ALTER COLUMN "statusTask" TYPE "public"."StatusTaskEnum_new" USING ("statusTask"::text::"public"."StatusTaskEnum_new");
ALTER TYPE "public"."StatusTaskEnum" RENAME TO "StatusTaskEnum_old";
ALTER TYPE "public"."StatusTaskEnum_new" RENAME TO "StatusTaskEnum";
DROP TYPE "public"."StatusTaskEnum_old";
ALTER TABLE "public"."tasks" ALTER COLUMN "statusTask" SET DEFAULT 'Fazer';
COMMIT;

-- AlterTable
ALTER TABLE "public"."employees" ALTER COLUMN "gender" SET DEFAULT 'Outro';

-- AlterTable
ALTER TABLE "public"."marks" ALTER COLUMN "statusMark" SET DEFAULT 'Agendada';

-- AlterTable
ALTER TABLE "public"."tasks" ALTER COLUMN "statusTask" SET DEFAULT 'Fazer',
ALTER COLUMN "PriorityTask" SET DEFAULT 'Baixa';
