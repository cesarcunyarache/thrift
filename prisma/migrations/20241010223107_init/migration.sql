-- CreateEnum
CREATE TYPE "Recurrencia" AS ENUM ('DIARIO', 'SEMANAL', 'MENSUAL', 'ANUAL');

-- AlterTable
ALTER TABLE "Cuentas" ALTER COLUMN "plaidId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Categorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presupuestos" (
    "id" TEXT NOT NULL,
    "montoMaximo" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presupuestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacciones" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "benificio" TEXT NOT NULL,
    "notas" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "cuentaId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transacciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alertas" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "umbral" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "presupuestoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recordatorios" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "recurrencia" "Recurrencia",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recordatorios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presupuestos_categoriaId_key" ON "Presupuestos"("categoriaId");

-- AddForeignKey
ALTER TABLE "Presupuestos" ADD CONSTRAINT "Presupuestos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacciones" ADD CONSTRAINT "Transacciones_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "Cuentas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacciones" ADD CONSTRAINT "Transacciones_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alertas" ADD CONSTRAINT "Alertas_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "Presupuestos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
