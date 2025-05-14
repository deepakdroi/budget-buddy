// import { PrismaClient } from "@/generated/prisma";

import { PrismaClient } from "@/generated/prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Avoid global cache in serverless
  prisma = new (await import("@/generated/prisma/client")).PrismaClient();
} else {
  // Use global cache in dev to avoid multiple clients during hot reload
  const globalForPrisma = global as unknown as { prisma?: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new (
      await import("@/generated/prisma/client")
    ).PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
