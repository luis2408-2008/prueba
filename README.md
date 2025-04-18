# Aplicación Express con Autenticación

Aplicación web Node.js con Express y PostgreSQL que incluye un sistema completo de autenticación.

## Características

- Registro y login de usuarios
- Gestión de sesiones con PostgreSQL
- Protección de rutas para usuarios autenticados
- Interfaz de usuario responsive con Tailwind CSS
- Diseñada para despliegue en Render.com

## Requisitos

- Node.js 18 o superior
- PostgreSQL (recomendado Neon.tech para bases de datos serverless)

## Instalación y ejecución local

1. Clonar este repositorio
2. Instalar dependencias: `npm install`
3. Copiar `.env.example` a `.env` y configurar las variables de entorno
4. Ejecutar en modo desarrollo: `npm run dev`

## Variables de entorno

```
# Variables de entorno para producción
DATABASE_URL=postgresql://usuario:contraseña@host.servidor.com/nombre_db?sslmode=require
SESSION_SECRET=clave_secreta_para_sesiones
PORT=3000

# Variables adicionales para desarrollo
NODE_ENV=development

# Variables de PostgreSQL
PGHOST=host.servidor.com
PGUSER=usuario
PGPASSWORD=contraseña
PGDATABASE=nombre_db
PGPORT=5432
```

## Despliegue en Render.com

Esta aplicación incluye un archivo `render.yaml` para una fácil configuración de despliegue en Render.com:

1. Crear una cuenta en [Render.com](https://render.com)
2. Conectar tu repositorio de GitHub
3. Utilizar la opción "Blueprint" y seleccionar este repositorio
4. Render creará automáticamente el servicio web y la base de datos según la configuración en `render.yaml`

## Scripts disponibles

- `npm run dev`: Ejecuta la aplicación en modo desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm start`: Inicia la aplicación en modo producción
- `npm run db:push`: Actualiza el esquema de la base de datos

## Estructura del proyecto

```
├── client/             # Código frontend
├── server/             # Código backend
│   ├── auth.ts         # Configuración de autenticación
│   ├── db.ts           # Conexión a base de datos
│   ├── index.ts        # Punto de entrada
│   ├── routes.ts       # Rutas de la API
│   ├── storage.ts      # Interfaz de almacenamiento
│   └── vite.ts         # Configuración de Vite
├── shared/             # Código compartido
│   └── schema.ts       # Esquema de la base de datos
├── views/              # Plantillas EJS
│   ├── dashboard.ejs   # Panel de usuario
│   ├── login.ejs       # Página de login
│   └── register.ejs    # Página de registro
├── scripts/            # Scripts de utilidad
├── .env                # Variables de entorno (local)
├── .env.example        # Ejemplo de variables de entorno
├── render.yaml         # Configuración para Render.com
└── package.json        # Dependencias y scripts
```

## Licencia

MIT