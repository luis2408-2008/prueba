import { Pool } from '@neondatabase/serverless';
import ws from 'ws';
import 'dotenv/config';

// Configuración para WebSockets con Neon
const neonConfig = {
  webSocketConstructor: ws
};
Object.defineProperty(globalThis, 'neonConfig', {
  value: neonConfig,
  configurable: true,
});

// Configuración de la base de datos desde variables de entorno
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const SQL_CREATE_SESSION_TABLE = `
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
`;

async function createSessionTable() {
  try {
    console.log('Creating session table...');
    await pool.query(SQL_CREATE_SESSION_TABLE);
    console.log('Session table created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating session table:', error);
    process.exit(1);
  }
}

createSessionTable();