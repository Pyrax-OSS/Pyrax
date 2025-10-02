import { Hono } from "hono";
import { corsMiddleware } from "./utils/cors";
import versionRoute from "./version/route";

const app = new Hono();

app.use("*", corsMiddleware);

app.route("/version", versionRoute);

app.get("/", (c) => c.json({ status: "ok" }));

export const config = { runtime: "edge" };
export default app.fetch;
