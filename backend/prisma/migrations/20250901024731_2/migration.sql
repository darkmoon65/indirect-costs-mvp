/*
  Warnings:

  - You are about to drop the `CostoIndirecto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CostoIndirecto" DROP CONSTRAINT "CostoIndirecto_operacionId_fkey";

-- DropTable
DROP TABLE "public"."CostoIndirecto";

-- CreateTable
CREATE TABLE "public"."Volumen" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Volumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CostoPorVolumen" (
    "id" SERIAL NOT NULL,
    "operacionId" INTEGER NOT NULL,
    "volumenId" INTEGER NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CostoPorVolumen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Volumen_nombre_key" ON "public"."Volumen"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "CostoPorVolumen_operacionId_volumenId_key" ON "public"."CostoPorVolumen"("operacionId", "volumenId");

-- AddForeignKey
ALTER TABLE "public"."CostoPorVolumen" ADD CONSTRAINT "CostoPorVolumen_operacionId_fkey" FOREIGN KEY ("operacionId") REFERENCES "public"."Operacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CostoPorVolumen" ADD CONSTRAINT "CostoPorVolumen_volumenId_fkey" FOREIGN KEY ("volumenId") REFERENCES "public"."Volumen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
