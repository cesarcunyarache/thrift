/*
  Warnings:

  - You are about to drop the column `montoMaximo` on the `Presupuestos` table. All the data in the column will be lost.
  - The `recurrencia` column on the `Recordatorios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Alertas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fechaFin` to the `Presupuestos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Presupuestos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodo` to the `Presupuestos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaFin` to the `Recordatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Recordatorios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Recordatorios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Periodo" AS ENUM ('DIARIO', 'SEMANAL', 'MENSUAL', 'TRIMESTRAL', 'ANUAL', 'PERSONALIZADO');

-- CreateEnum
CREATE TYPE "EstadoRecordatorio" AS ENUM ('PENDIENTE', 'PROXIMO', 'REALIZADO');

-- DropForeignKey
ALTER TABLE "Alertas" DROP CONSTRAINT "Alertas_presupuestoId_fkey";

-- AlterTable
ALTER TABLE "Presupuestos" DROP COLUMN "montoMaximo",
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "fechaFin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodo" "Periodo" NOT NULL,
ADD COLUMN     "recurrencia" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Recordatorios" ADD COLUMN     "fechaFin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodo" "Periodo",
ADD COLUMN     "presupuestoId" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "umbral" DECIMAL(65,30),
DROP COLUMN "recurrencia",
ADD COLUMN     "recurrencia" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "Alertas";

-- DropEnum
DROP TYPE "Recurrencia";

-- CreateTable
CREATE TABLE "Notificaciones" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recordatorioId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notificaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recordatorios" ADD CONSTRAINT "Recordatorios_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "Presupuestos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificaciones" ADD CONSTRAINT "Notificaciones_recordatorioId_fkey" FOREIGN KEY ("recordatorioId") REFERENCES "Recordatorios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
