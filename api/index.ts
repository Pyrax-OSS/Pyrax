import { Hono, Context } from "hono";
import { Next } from "hono/dist/types";

const app = new Hono();

const allowedOrigins = ["https://pyrax.dev", "https://app.pyrax.dev"];

app.use("*", async (c: Context, next: Next) => {
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
});

app.get("/version", (c) => c.json({ version: "Pyrax - v1.5.3" }));
app.get("/", (c) => c.json({ status: "ok" }));

export const config = { runtime: "edge" };
export default app.fetch;
