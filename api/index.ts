import { Hono } from "hono";
import { cors } from "hono/cors";
import versionRoute from "./version/route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["https://pyrax.dev", "https://app.pyrax.dev"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (c) => c.json({ status: "ok" }));

app.route("/", versionRoute);

export const config = { runtime: "edge" };
export default app.fetch;
