import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ version: "Pyrax - v1.5.4" });
});

export default app;
