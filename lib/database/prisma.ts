import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient | undefined;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch (error) {
  console.warn('Prisma client could not be initialized:', error);
  // Create a mock client for deployment without database
  prismaInstance = undefined;
}

export const prisma = prismaInstance;
export default prisma;