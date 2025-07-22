import { User } from "../models/userModel.js";

export const getUsers = async (_req, res) => {
  const users = await User.getAll();
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  await User.updateRole(id, role);
  res.json({ message: "Role updated" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.delete(id);
  res.json({ message: "User deleted" });
}; 