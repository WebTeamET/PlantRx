import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getApp } from "../server/index";

let appPromise: ReturnType<typeof getApp> | null = null;

function getAppPromise() {
  if (!appPromise) appPromise = getApp();
  return appPromise;
}

/**
 * Vercel serverless handler: forwards all requests to the Express app.
 * Configure vercel.json rewrites so every path hits this handler.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { app } = await getAppPromise();
  app(req as any, res as any);
}
