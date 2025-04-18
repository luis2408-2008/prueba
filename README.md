# Express PostgreSQL Auth Demo

Una aplicación web de producción con Node.js + Express + PostgreSQL con autenticación y gestión de sesiones.

## Características

- Registro de usuarios (nombre completo, correo electrónico, contraseña)
- Inicio/cierre de sesión de usuarios usando express-session y connect-pg-simple
- Contraseñas cifradas con bcrypt
- Base de datos PostgreSQL con Drizzle ORM
- Plantillas EJS para el frontend
- Estilo con Tailwind CSS
- Diseño responsivo
- Página de dashboard protegida

## Instrucciones de configuración

1. Clona el repositorio

   ```bash
   git clone https://github.com/your-username/express-auth-demo.git
   cd express-auth-demo
   ```

2. Configura las variables de entorno

   ```bash
   cp .env.example .env
   ```

   Edita el archivo .env con tus propias variables (o usa las proporcionadas).

3. Instala las dependencias

   ```bash
   npm install
   ```

4. Ejecuta las migraciones de la base de datos

   ```bash
   npm run db:push
   ```

5. Inicia el servidor de desarrollo

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en http://localhost:3000

## Despliegue en Vercel

Esta aplicación está configurada para desplegarse fácilmente en Vercel:

1. Sube tu código a GitHub
2. Crea un nuevo proyecto en Vercel y enlaza tu repositorio
3. Añade las siguientes variables de entorno:
   - DATABASE_URL
   - SESSION_SECRET
   - NODE_ENV (establece como "production")
   - PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT (si usas PostgreSQL separado)

El archivo vercel.json ya está configurado con:
```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": "dist"
}
```

## Estructura del proyecto

- `/server` - Servidor Express, rutas y lógica de autenticación
- `/views` - Plantillas EJS para el frontend
- `/shared` - Esquemas y tipos compartidos
- `/public` - Archivos estáticos (CSS, JavaScript, imágenes)

## Variables de entorno necesarias

```
# Variables de entorno para producción
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/database?sslmode=require
SESSION_SECRET=claveSecretaParaSesiones
PORT=3000

# Variables adicionales para desarrollo
NODE_ENV=production

# Variables de PostgreSQL (si usas un servicio como Neon)
PGHOST=tu-host-postgresql
PGUSER=tu-usuario
PGPASSWORD=tu-contraseña
PGDATABASE=tu-base-de-datos
PGPORT=5432
```

## Comandos disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run db:push` - Aplica cambios del esquema a la base de datos
