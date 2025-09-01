import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolvers } from "./graphql/index.js";

const prisma = new PrismaClient();
const typeDefs = readFileSync("./src/graphql/schema.graphql", "utf-8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: () => ({ prisma }),
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

console.log(`server on url:  ${url}`);
