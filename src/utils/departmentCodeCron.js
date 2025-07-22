import cron from "node-cron";
import { db } from "../config/db.js";
import crypto from "crypto";

function generateCode(length = 8) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

// Runs every Monday at 00:00
cron.schedule("0 0 * * 1", async () => {
  try {
    const [departments] = await db.execute("SELECT name FROM departments");
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now

    for (const dept of departments) {
      const code = generateCode(8);
      // Insert new code
      await db.execute(
        "INSERT INTO dept_keys (department, weekly_key, expires_at) VALUES (?, ?, ?)",
        [dept.name, code, expiresAt]
      );
      // Expire previous codes for this department
      await db.execute(
        "UPDATE dept_keys SET expires_at = ? WHERE department = ? AND expires_at > ? AND weekly_key != ?",
        [now, dept.name, now, code]
      );
    }
    console.log("Department codes regenerated!");
  } catch (err) {
    console.error("Error regenerating department codes:", err);
  }
}); 