import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toNodeHandler } from "better-auth/node";

export const config = { api: { bodyParser: false } };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { auth } = await import("../../lib/auth");
    const nodeHandler = toNodeHandler(auth);
    return nodeHandler(req, res);
  } catch (err) {
    console.error("Auth handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
