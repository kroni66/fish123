import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add session middleware for Directus authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  name: 'connect.sid',
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use true in production (HTTPS), false in dev (HTTP)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize routes and setup error handling
(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err); // Log the full error on the server

    const status = err.status || err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // For 500 errors in production, send a generic message to the client
    if (status === 500 && process.env.NODE_ENV === 'production') {
      message = "Internal Server Error";
    }

    // If it's a ZodError and hasn't been handled by a route, it might end up here.
    // We generally want ZodErrors to be handled by routes to return 400.
    // If it reaches here as a 500, it's an unexpected ZodError propagation.
    if (err instanceof require('zod').ZodError) {
        // This case should ideally be caught earlier and result in a 400.
        // If it gets here, it implies a programming error.
        return res.status(400).json({ message: "Invalid input data", errors: err.errors });
    }

    res.status(status).json({ message });
    // Do NOT re-throw the error, as Express has handled it by sending a response.
  });

  // For Vercel deployment, we don't start the server - we export the app
  // For local development, we still start the server
  if (process.env.VERCEL) {
    // Export the app for Vercel serverless function
    module.exports = app;
  } else {
    // Local development setup
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
  }
})();

// For Vercel, also export the app as default export
export default app;
