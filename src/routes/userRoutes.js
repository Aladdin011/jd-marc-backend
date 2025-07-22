import { Router } from "express";
import { getUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/auth.js";
const router = Router();
router.use(protect, adminOnly);
router.get("/", getUsers);
router.patch(":/id/role", updateUserRole);
router.delete(":/id", deleteUser);
export default router; 