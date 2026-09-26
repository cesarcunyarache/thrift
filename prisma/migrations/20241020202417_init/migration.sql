/*
  Warnings:

  - You are about to drop the column `fechaFin` on the `Recordatorios` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicio` on the `Recordatorios` table. All the data in the column will be lost.
  - Added the required column `monto` to the `Presupuestos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Recordatorios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EstadoRecordatorio" ADD VALUE 'EN_PROCESO';
ALTER TYPE "EstadoRecordatorio" ADD VALUE 'VENCIDO';
ALTER TYPE "EstadoRecordatorio" ADD VALUE 'CANCELADO';

-- AlterTable
ALTER TABLE "Presupuestos" ADD COLUMN     "monto" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recordatorios" DROP COLUMN "fechaFin",
DROP COLUMN "fechaInicio",
ADD COLUMN     "estado" "EstadoRecordatorio" NOT NULL,
ADD COLUMN     "monto" INTEGER;
