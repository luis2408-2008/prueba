# Express PostgreSQL Auth Demo

A production-ready Node.js + Express + PostgreSQL web application with authentication and session management.

## Features

- User registration (full name, email, password)
- User login/logout using express-session and connect-pg-simple
- Passwords hashed with bcrypt
- PostgreSQL database with Drizzle ORM
- EJS templating for frontend
- Tailwind CSS styling
- Responsive design
- Protected dashboard page

## Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/express-auth-demo.git
   cd express-auth-demo
   ```

2. Copy environment variables

   ```bash
   cp .env.example .env
   ```

   Fill in the SESSION_SECRET in the .env file with a secure random string. 
   The DATABASE_URL is already configured to use the provided Neon PostgreSQL database.

3. Install dependencies

   ```bash
   npm install
   ```

4. Run database migrations

   ```bash
   npm run db:push
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## Deployment to Vercel

This application is configured to deploy easily to Vercel:

1. Push your code to GitHub
2. Create a new project in Vercel and link your repository
3. Add the environment variables:
   - DATABASE_URL
   - SESSION_SECRET
4. Deploy!

## Project Structure

- `/server` - Express server, routes, and authentication logic
- `/views` - EJS templates for the frontend
- `/shared` - Shared schemas and types
