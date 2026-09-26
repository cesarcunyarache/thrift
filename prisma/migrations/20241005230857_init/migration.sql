/*
  Warnings:

  - You are about to drop the `Cuenta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cuenta";

-- CreateTable
CREATE TABLE "Cuentas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("id")
);
