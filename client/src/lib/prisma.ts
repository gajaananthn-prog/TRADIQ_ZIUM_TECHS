import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL;

// Fail-Safe Initialization
let adapter: PrismaPg | undefined;
let pool: Pool | undefined;

try {
    if (connectionString) {
        pool = new Pool({ connectionString });
        adapter = new PrismaPg(pool);
    } else {
        console.warn("WARN: DATABASE_URL missing. Running in UI-Only Mode.");
    }
} catch (e) {
    console.warn("WARN: Failed to initialize DB Adapter. Running in UI-Only Mode.", e);
}

// Singleton with Fallback
export const prisma =
    globalForPrisma.prisma ||
    (adapter ? new PrismaClient({ adapter }) : new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
