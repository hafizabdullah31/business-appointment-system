import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/db/drizzle/schema.ts',
  out: './src/db/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
} satisfies Config;
