import { toNodeHandler } from "better-auth/node";

const handler = async (req: any, res: any) => {
  const authModule = await import("../../lib/auth.js");
  const nodeHandler = toNodeHandler(authModule.auth.handler);
  return nodeHandler(req, res);
};

export const config = { api: { bodyParser: false } };

export default handler;
