#!/bin/bash

# Script de configuración para Render.com
# Ejecuta este script durante el proceso de construcción

echo "Iniciando configuración para Render.com..."

# Verificar NODE_ENV
if [ "$NODE_ENV" != "production" ]; then
  echo "ADVERTENCIA: NODE_ENV no está establecido como 'production'"
  export NODE_ENV=production
  echo "NODE_ENV establecido como 'production'"
fi

# Verificar variables de entorno esenciales
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL no está definida"
  exit 1
fi

if [ -z "$SESSION_SECRET" ]; then
  echo "ERROR: SESSION_SECRET no está definida"
  exit 1
fi

# Crear tabla de sesiones
echo "Ejecutando configuración de la base de datos..."
node --import tsx scripts/setup-prod.js

if [ $? -ne 0 ]; then
  echo "ERROR: Falló la configuración de la base de datos"
  exit 1
fi

echo "Configuración completada con éxito"
exit 0