import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export class PrismaService {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });

    this.instance.$connect();
    return this.instance;
  }
}
