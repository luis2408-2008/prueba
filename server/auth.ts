import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt";
import { pool } from "./db";
import { storage } from "./storage";
import { User, loginSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

// Extend Express Request type to include session user
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

export function setupAuth(app: Express) {
  // Set up PostgreSQL session store
  const PgSession = connectPgSimple(session);
  
  // Configure session middleware
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "session", // Default table name
        createTableIfMissing: true,
      }),
      secret: process.env.SESSION_SECRET || "desarrollo_local_no_usar_en_produccion",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Middleware to check if user is authenticated
  function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
      return next();
    }
    res.redirect("/login");
  }

  // Register route
  app.post("/register", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user with this email already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.render("register", { 
          error: "User with this email already exists",
          values: {
            name: validatedData.name,
            email: validatedData.email
          }
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      // Set user in session and redirect to dashboard
      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.render("register", { 
          error: validationError.message,
          values: req.body
        });
      } else {
        console.error("Registration error:", error);
        res.render("register", { 
          error: "An error occurred during registration",
          values: req.body
        });
      }
    }
  });

  // Login route
  app.post("/login", async (req, res) => {
    try {
      // Validate request body
      const validatedData = loginSchema.parse(req.body);
      
      // Get user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.render("login", { 
          error: "Invalid email or password",
          values: { email: validatedData.email }
        });
      }
      
      // Compare passwords
      const passwordMatch = await bcrypt.compare(validatedData.password, user.password);
      if (!passwordMatch) {
        return res.render("login", { 
          error: "Invalid email or password",
          values: { email: validatedData.email }
        });
      }
      
      // Set user in session and redirect to dashboard
      req.session.user = user;
      res.redirect("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.render("login", { 
          error: validationError.message,
          values: req.body
        });
      } else {
        console.error("Login error:", error);
        res.render("login", { 
          error: "An error occurred during login",
          values: req.body
        });
      }
    }
  });

  // Logout route
  app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
      }
      res.redirect("/login");
    });
  });

  // Route to render login page
  app.get("/login", (req, res) => {
    if (req.session.user) {
      return res.redirect("/");
    }
    res.render("login", { error: null, values: {} });
  });

  // Route to render register page
  app.get("/register", (req, res) => {
    if (req.session.user) {
      return res.redirect("/");
    }
    res.render("register", { error: null, values: {} });
  });

  // Route to render dashboard (protected)
  app.get("/", isAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.session.user });
  });

  return { isAuthenticated };
}
