export const plantaResolvers = {
  Query: {
    plantas: async (_, __, { prisma }) => {
      return prisma.planta.findMany({
        include: {
          operaciones: {
            include: {
              costos: {
                include: { volumen: true },
              },
            },
          },
        },
      });
    },
    planta: async (_, { id }, { prisma }) => {
      return prisma.planta.findUnique({
        where: { id: Number(id) },
        include: {
          operaciones: {
            include: { costos: { include: { volumen: true } } },
          },
        },
      });
    },
  },
};
