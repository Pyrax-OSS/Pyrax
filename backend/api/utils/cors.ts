import { Context } from "hono";
import { MiddlewareHandler } from "hono/types";

const allowedOrigins = ["https://pyrax.dev", "https://app.pyrax.dev"];

export const corsMiddleware: MiddlewareHandler = async (c: Context, next) => {
  const origin = c.req.header("origin");

  if (c.req.method === "OPTIONS") {
    if (origin && allowedOrigins.includes(origin)) {
      c.header("Access-Control-Allow-Origin", origin);
      c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      c.header("Access-Control-Allow-Credentials", "true");
    }
    return c.body(null, 204);
  }

  await next();

  if (origin && allowedOrigins.includes(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Credentials", "true");
  }
};

