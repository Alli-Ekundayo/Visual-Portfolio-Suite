import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const { Pool } = pg;

// Schema definition (inline to avoid import issues in serverless)
const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Handle POST /api/messages
  if (req.method === "POST" && req.url?.includes("/messages")) {
    try {
      const input = insertMessageSchema.parse(req.body);
      const [message] = await db.insert(messages).values(input).returning();
      return res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error("Error creating message:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(404).json({ message: "Not found" });
}
