import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import branchRoutes from "./routes/branchRoutes.js"; // ✅ adjust path as needed

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//  Routes
app.use("/api/branches", branchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
