// controllers/branchController.js
import Branch from "../models/Branch.js";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// 🏬 Add new branch
export const addBranch = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;

    const existing = await Branch.findOne({ walletAddress });
    if (existing) return res.status(400).json({ error: "Wallet already registered" });

    const branch = new Branch({ name, email, walletAddress });
    await branch.save();
    res.json({ status: "success", branch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all branches
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get transaction history
export const getTransactions = async (req, res) => {
  try {
    const { address } = req.params;
    const history = await provider.getHistory(address);
    const txs = history.map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: ethers.utils.formatEther(tx.value),
      time: new Date(tx.timestamp * 1000)
    }));
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
