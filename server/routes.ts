import express, { type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import ejs from "ejs";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up view engine
  app.set("views", path.join(process.cwd(), "views"));
  app.set("view engine", "ejs");
  
  // Set up static files
  app.use("/public", express.static(path.join(process.cwd(), "public")));
  
  // Set up auth routes and middleware
  setupAuth(app);
  
  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
