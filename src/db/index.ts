import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const pool = new Pool({
  connectionString: connectionString,
});

export const db = drizzle(pool, { schema });

// Automatically run migrations on startup
migrate(db, { migrationsFolder: 'drizzle' })
  .then(() => console.log('Database tables updated successfully!'))
  .catch((err) => console.error('Failed to update database tables:', err));
