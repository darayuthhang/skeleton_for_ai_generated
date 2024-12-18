import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || prismaClientSingleton();

//In a non-production environment
//This is done to reuse the same instance across multiple requests, 
//improving performance during development and testing.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export const db = prisma;
