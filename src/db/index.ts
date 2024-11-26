import { PrismaClient, Prisma } from "@prisma/client";
const prismaClientSingleton = () => {
  return new PrismaClient();
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export type TransactionClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
