import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export let db;
export async function connectDB() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,  // ⚠️ your host
      user: process.env.DB_USER,  // ⚠️ your user
      password: process.env.DB_PASS, // ⚠️ your password
      database: process.env.DB_NAME, // ⚠️ your DB name
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ DB connection error", err.message);
    process.exit(1);
  }
} 