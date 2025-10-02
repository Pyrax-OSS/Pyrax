import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toNodeHandler } from "better-auth/node";

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const authModule = await import("../../lib/auth");
    const nodeHandler = toNodeHandler(authModule.auth.handler);
    return nodeHandler(req, res);
  } catch (err) {
    console.error("Auth handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
