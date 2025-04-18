#!/usr/bin/env node

/**
 * Script para configurar la aplicación en producción
 * 
 * Este script realiza las siguientes tareas:
 * 1. Verifica las variables de entorno necesarias
 * 2. Crea la tabla de sesiones si no existe
 */

import { Pool } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración para WebSockets con Neon
globalThis.neonConfig = {
  webSocketConstructor: ws
};

// Verificar variables de entorno requeridas
console.log('Verificando variables de entorno...');
const requiredEnvVars = [
  'DATABASE_URL',
  'SESSION_SECRET',
  'PORT'
];

const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error(`ERROR: Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
  process.exit(1);
}

console.log('✓ Todas las variables de entorno están presentes');

// Configuración de la base de datos
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
    console.log('Creando tabla de sesiones si no existe...');
    await pool.query(SQL_CREATE_SESSION_TABLE);
    console.log('✓ Tabla de sesiones verificada');
    return true;
  } catch (error) {
    console.error('Error al crear la tabla de sesiones:', error);
    return false;
  }
}

// Ejecutar configuraciones
async function setup() {
  try {
    const sessionTableCreated = await createSessionTable();
    if (!sessionTableCreated) {
      process.exit(1);
    }

    console.log('✓ Configuración completada. La aplicación está lista para ejecutarse en producción.');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la configuración:', error);
    process.exit(1);
  }
}

setup();