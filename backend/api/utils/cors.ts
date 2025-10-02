import { Context } from "hono";
import { Next } from "hono/dist/types";

const allowedOrigins = ["https://pyrax.dev", "https://app.pyrax.dev"];

export async function corsMiddleware(c: Context, next: Next) {
  const origin = c.req.header("origin");
  if (origin && allowedOrigins.includes(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Credentials", "true");
  }

  if (c.req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  await next();
}
