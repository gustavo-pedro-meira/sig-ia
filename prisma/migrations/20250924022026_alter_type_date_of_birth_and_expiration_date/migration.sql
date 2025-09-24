-- AlterTable
-- Muda o tipo da coluna dateOfBirth de TEXT para TIMESTAMP, convertendo os valores existentes.
ALTER TABLE "employees"
ALTER COLUMN "dateOfBirth" SET DATA TYPE TIMESTAMP(3)
USING ("dateOfBirth"::timestamp);

-- Muda o tipo da coluna expirationDate de TEXT para TIMESTAMP, convertendo os valores existentes.
ALTER TABLE "employees"
ALTER COLUMN "expirationDate" SET DATA TYPE TIMESTAMP(3)
USING ("expirationDate"::timestamp);