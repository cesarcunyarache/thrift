/*
  Warnings:

  - You are about to drop the column `nombre` on the `Transacciones` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transacciones" DROP CONSTRAINT "Transacciones_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Transacciones" DROP COLUMN "nombre",
ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transacciones" ADD CONSTRAINT "Transacciones_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
