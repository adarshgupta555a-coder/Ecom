import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Define global Prisma instance type
const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

// Create Prisma Client
const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is not defined");
    }

    const adapter = new PrismaPg({
        connectionString,
    });

    return new PrismaClient({ adapter });
};

// Reuse existing instance or create a new one
export const prisma =
    globalForPrisma.prisma ?? createPrismaClient();

// Save instance globally during development
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}