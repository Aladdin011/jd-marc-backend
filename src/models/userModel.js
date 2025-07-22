import { db } from "../config/db.js";

export const User = {
  async create(user) {
    const [rows] = await db.execute(
      `INSERT INTO users(name, email, password, role, department) VALUES (?,?,?,?,?)`,
      [user.name, user.email, user.password, user.role, user.department]
    );
    return rows.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.execute(`SELECT id,name,email,role,department,created_at FROM users`);
    return rows;
  },

  async updateRole(id, role) {
    await db.execute(`UPDATE users SET role = ? WHERE id = ?`, [role, id]);
  },

  async delete(id) {
    await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
  },
}; 