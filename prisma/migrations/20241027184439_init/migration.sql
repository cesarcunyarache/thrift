-- AlterTable
ALTER TABLE "Recordatorios" ADD COLUMN     "activo" TIMESTAMP(3),
ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "fecha" DROP NOT NULL;
