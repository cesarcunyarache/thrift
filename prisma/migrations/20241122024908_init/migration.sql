-- CreateTable
CREATE TABLE "Comentarios" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "urlImagen" TEXT,
    "comentario" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preguntas" (
    "id" TEXT NOT NULL,
    "pregunta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuestas" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "preguntaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Respuestas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comentarios_visible_createdAt_idx" ON "Comentarios"("visible", "createdAt");

-- AddForeignKey
ALTER TABLE "Respuestas" ADD CONSTRAINT "Respuestas_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Preguntas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
