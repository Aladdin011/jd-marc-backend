import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import "./utils/departmentCodeCron.js";

// DB
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("JD Marc API running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`)); 