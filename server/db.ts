import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import "dotenv/config";

neonConfig.webSocketConstructor = ws;

export let pool: Pool | null;
export let db: ReturnType<typeof drizzle> | null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  console.warn("DATABASE_URL not set, skipping database initialization");
  pool = null;
  db = null;
}
