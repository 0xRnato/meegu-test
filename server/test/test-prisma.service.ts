// test/test-prisma.service.ts

import { PrismaClient } from '@prisma/client';

export class TestPrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL, // Use the test database URL
        },
      },
    });
  }
}
