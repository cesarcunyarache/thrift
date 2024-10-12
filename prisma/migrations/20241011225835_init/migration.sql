/*
  Warnings:

  - You are about to drop the column `benificio` on the `Transacciones` table. All the data in the column will be lost.
  - You are about to alter the column `monto` on the `Transacciones` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `beneficiario` to the `Transacciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacciones" DROP COLUMN "benificio",
ADD COLUMN     "beneficiario" TEXT NOT NULL,
ALTER COLUMN "monto" SET DATA TYPE INTEGER,
ALTER COLUMN "notas" DROP NOT NULL;
