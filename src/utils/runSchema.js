import fs from "fs/promises";
import { connectDB, db } from "../config/db.js";

async function runSchema() {
  await connectDB();
  const sql = await fs.readFile(new URL("../../schema.sql", import.meta.url), "utf-8");
  const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    try {
      await db.execute(stmt);
      console.log("Executed:\n", stmt);
    } catch (err) {
      console.error("Error executing statement:\n", stmt, "\n", err.message);
    }
  }
  process.exit(0);
}

runSchema(); 