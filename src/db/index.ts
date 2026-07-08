import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

// Disable prefetch as it's not supported by neon/pooling setups sometimes
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

// Automatically run migrations on startup
migrate(db, { migrationsFolder: 'drizzle' })
  .then(() => console.log('Database tables updated successfully!'))
  .catch((err) => console.error('Failed to update database tables:', err));
