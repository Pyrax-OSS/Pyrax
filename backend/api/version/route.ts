import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json({ version: "Pyrax - v1.5.3" }));

export default app;
