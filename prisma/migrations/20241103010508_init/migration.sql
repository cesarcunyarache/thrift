/*
  Warnings:

  - Made the column `fecha` on table `Recordatorios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recordatorios" ALTER COLUMN "fecha" SET NOT NULL;
