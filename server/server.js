// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import branchRoutes from "./routes/branchRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/branches", branchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
