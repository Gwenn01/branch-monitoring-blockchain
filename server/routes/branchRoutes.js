// routes/branchRoutes.js
import express from "express";
import { addBranch, getBranches, getTransactions } from "../controllers/branchController.js";

const router = express.Router();

router.post("/", addBranch);
router.get("/", getBranches);
router.get("/:address/transactions", getTransactions);

export default router;
