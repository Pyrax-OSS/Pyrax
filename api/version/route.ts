import { Hono } from "hono";

const route = new Hono();

route.get("/version", (c) => c.json({ version: "Pyrax - v1.5.3" }));

export default route;
