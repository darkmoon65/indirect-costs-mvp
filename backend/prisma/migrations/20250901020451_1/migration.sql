-- CreateTable
CREATE TABLE "public"."Planta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Planta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Operacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "plantaId" INTEGER NOT NULL,

    CONSTRAINT "Operacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CostoIndirecto" (
    "id" SERIAL NOT NULL,
    "volumen" TEXT NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "operacionId" INTEGER NOT NULL,

    CONSTRAINT "CostoIndirecto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Operacion" ADD CONSTRAINT "Operacion_plantaId_fkey" FOREIGN KEY ("plantaId") REFERENCES "public"."Planta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CostoIndirecto" ADD CONSTRAINT "CostoIndirecto_operacionId_fkey" FOREIGN KEY ("operacionId") REFERENCES "public"."Operacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
