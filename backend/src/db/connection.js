import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema.js';
import { config } from '../config/index.js';

let db = null;
let client = null;

if (config.databaseUrl && !config.databaseUrl.includes('localhost:5432/vibelearn')) {
  try {
    client = postgres(config.databaseUrl, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  } catch (err) {
    console.warn('⚠️ Could not initialize live PostgreSQL client:', err.message);
  }
} else if (config.databaseUrl) {
  // Local postgres or development
  try {
    client = postgres(config.databaseUrl, {
      max: 5,
      idle_timeout: 10,
      connect_timeout: 5,
      onnotice: () => {},
    });
    db = drizzle(client, { schema });
  } catch (err) {
    console.warn('⚠️ Could not initialize local PostgreSQL client:', err.message);
  }
}

export { db, client, schema };
