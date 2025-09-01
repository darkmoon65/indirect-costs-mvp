export const operacionResolvers = {
  Query: {
    operaciones: async (_, __, { prisma }) => {
      return prisma.operacion.findMany({
        include: { costos: true, planta: true },
      });
    },
    operacion: async (_, { id }, { prisma }) => {
      return prisma.operacion.findUnique({
        where: { id: Number(id) },
        include: { costos: true, planta: true },
      });
    },
  },
  Mutation: {
    createOperacion: async (_, { input }, { prisma }) => {
      const { nombre, plantaId, costos } = input;

      const plantaIdInt = parseInt(plantaId, 10);

      const operacion = await prisma.operacion.create({
        data: {
          nombre,
          planta: {
            connect: {
              id: plantaIdInt,
            },
          },
          costos: {
            create: costos.map((costo) => ({
              volumenId: parseInt(costo.volumenId, 10),
              costo: parseFloat(costo.costo),
            })),
          },
        },
        include: {
          planta: true,
          costos: {
            include: {
              volumen: true,
            },
          },
        },
      });

      return operacion;
    },
    updateOperacion: async (_, { id, input }, { prisma }) => {
      const { nombre, plantaId, costos } = input;
      const plantaIdInt = parseInt(plantaId, 10);

      const operacion = await prisma.operacion.update({
        where: { id: parseInt(id, 10) },
        data: {
          nombre,
          planta: {
            connect: {
              id: plantaIdInt,
            },
          },
          costos: {
            deleteMany: {},
            create: costos.map((costo) => ({
              volumenId: parseInt(costo.volumenId, 10),
              costo: parseFloat(costo.costo),
            })),
          },
        },
        include: {
          planta: true,
          costos: {
            include: {
              volumen: true,
            },
          },
        },
      });

      return operacion;
    },
  },
};
