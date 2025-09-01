import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.costoPorVolumen.deleteMany();
  await prisma.operacion.deleteMany();
  await prisma.planta.deleteMany();

  await prisma.volumen.createMany({
    data: [
      { nombre: "300kg" },
      { nombre: "500kg" },
      { nombre: "1T" },
      { nombre: "3T" },
      { nombre: "5T" },
      { nombre: "10T" },
      { nombre: "20T" },
      { nombre: "30T" },
    ],
    skipDuplicates: true,
  });

  const volumenes = await prisma.volumen.findMany();

  const getVolumenId = (nombre) => {
    const v = volumenes.find((v) => v.nombre === nombre);
    if (!v) throw new Error(`Volumen ${nombre} no encontrado`);
    return v.id;
  };

  await prisma.planta.create({
    data: {
      nombre: "Planta Lima",
      operaciones: {
        create: [
          {
            nombre: "Impresión",
            costos: {
              create: [
                { volumenId: getVolumenId("300kg"), costo: 0.015 },
                { volumenId: getVolumenId("500kg"), costo: 15 },
                { volumenId: getVolumenId("1T"), costo: 15 },
                { volumenId: getVolumenId("3T"), costo: 10 },
                { volumenId: getVolumenId("5T"), costo: 8 },
                { volumenId: getVolumenId("10T"), costo: 7 },
                { volumenId: getVolumenId("20T"), costo: 5 },
                { volumenId: getVolumenId("30T"), costo: 4.8 },
              ],
            },
          },
          {
            nombre: "Empaque",
            costos: {
              create: [
                { volumenId: getVolumenId("300kg"), costo: 0.02 },
                { volumenId: getVolumenId("500kg"), costo: 20 },
                { volumenId: getVolumenId("1T"), costo: 18 },
                { volumenId: getVolumenId("3T"), costo: 15 },
                { volumenId: getVolumenId("5T"), costo: 12 },
                { volumenId: getVolumenId("10T"), costo: 9 },
                { volumenId: getVolumenId("20T"), costo: 7 },
                { volumenId: getVolumenId("30T"), costo: 6.5 },
              ],
            },
          },
          {
            nombre: "Transporte",
            costos: {
              create: [
                { volumenId: getVolumenId("300kg"), costo: 0.05 },
                { volumenId: getVolumenId("500kg"), costo: 25 },
                { volumenId: getVolumenId("1T"), costo: 22 },
                { volumenId: getVolumenId("3T"), costo: 18 },
                { volumenId: getVolumenId("5T"), costo: 15 },
                { volumenId: getVolumenId("10T"), costo: 12 },
                { volumenId: getVolumenId("20T"), costo: 10 },
                { volumenId: getVolumenId("30T"), costo: 9 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeders completados");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
