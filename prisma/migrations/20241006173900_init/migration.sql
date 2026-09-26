/*
  Warnings:

  - Added the required column `plaidId` to the `Cuentas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuentas" ADD COLUMN     "plaidId" TEXT NOT NULL;
