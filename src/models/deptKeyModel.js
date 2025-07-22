import { db } from "../config/db.js";

export const DeptKey = {
  async findValidKey(department, key) {
    const [rows] = await db.execute(
      `SELECT * FROM dept_keys WHERE department = ? AND weekly_key = ? AND expires_at > NOW()` ,
      [department, key]
    );
    return rows[0];
  },
}; 