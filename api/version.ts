import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.get("/api/version", (c) => c.json({ version: "Pyrax - v1.5.3" }));

export default handle(app);
