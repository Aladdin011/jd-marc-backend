import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { DeptKey } from "../models/deptKeyModel.js";
import { generateToken } from "../utils/generateToken.js";

// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password, department, deptCode } = req.body;
  if (!email.endsWith("@jdmarcng.com"))
    return res.status(400).json({ message: "Company email required" });

  const existing = await User.findByEmail(email);
  if (existing) return res.status(400).json({ message: "Email exists" });

  // Verify department code if staff
  if (department && deptCode) {
    const valid = await DeptKey.findValidKey(department, deptCode);
    if (!valid)
      return res.status(401).json({ message: "Invalid or expired department code" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const id = await User.create({ name, email, password: hashed, role: "staff", department });
  const token = generateToken({ id });
  // Return full user object and token as expected by frontend
  const user = await User.findById(id);
  res.status(201).json({ 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      department: user.department 
    }, 
    token 
  });
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password, department, uniqueKey } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Password incorrect" });

  // If staff, validate current weekly uniqueKey
  if (user.role === "staff") {
    const validKey = await DeptKey.findValidKey(user.department, uniqueKey);
    if (!validKey)
      return res.status(401).json({ message: "Unique key invalid or expired" });
  }

  const token = generateToken({ id: user.id });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
}; 