import { Hono } from "hono";
import { corsMiddleware } from "./utils/cors";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const app = new Hono();

app.use("*", corsMiddleware);

async function loadRoutes(dir: string, basePath: string = "") {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      await loadRoutes(fullPath, `${basePath}/${entry}`);
    } else if (entry === "route.ts") {
      const route = await import(fullPath);
      if (route.default) {
        app.route(basePath || "/", route.default);
      }
    }
  }
}

await loadRoutes(join(process.cwd(), "backend", "api"));

app.get("/", (c) => c.json({ status: "ok" }));

export const config = { runtime: "edge" };
export default app.fetch;
