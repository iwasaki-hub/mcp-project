import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";
import { timingSafeEqual } from "node:crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ ok: false });
  const token = process.env.ATLAS_HEALTHCHECK_TOKEN;
  const uri = process.env.MONGODB_URI;
  if (!token || !uri) return res.status(503).json({ ok: false });
  const supplied = req.headers.authorization?.replace(/^Bearer /, "") ?? "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(token);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ ok: false });
  }
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 4000, maxPoolSize: 1 });
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(503).json({ ok: false });
  } finally {
    await client.close().catch(() => undefined);
  }
}
