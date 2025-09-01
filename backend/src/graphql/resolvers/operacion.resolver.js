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
};
