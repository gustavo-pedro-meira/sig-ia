/*
  Warnings:

  - The values [SECRETARIO] on the enum `CargoEmployeeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CargoEmployeeEnum_new" AS ENUM ('PREFEITO', 'Secretario', 'DIRETOR', 'TECNICO', 'COORDENADOR');
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" DROP DEFAULT;
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" TYPE "public"."CargoEmployeeEnum_new" USING ("cargo"::text::"public"."CargoEmployeeEnum_new");
ALTER TYPE "public"."CargoEmployeeEnum" RENAME TO "CargoEmployeeEnum_old";
ALTER TYPE "public"."CargoEmployeeEnum_new" RENAME TO "CargoEmployeeEnum";
DROP TYPE "public"."CargoEmployeeEnum_old";
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" SET DEFAULT 'Secretario';
COMMIT;

-- AlterTable
ALTER TABLE "public"."employees" ALTER COLUMN "cargo" SET DEFAULT 'Secretario';
