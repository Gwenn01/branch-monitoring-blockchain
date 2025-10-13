import { JsonRpcProvider, formatEther } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize provider (v6 style)
const provider = new JsonRpcProvider(process.env.RPC_URL);

// 🗂️ Temporary in-memory storage (acts like a mock database)
let branches = [];

// 🏬 Add new branch
export const addBranch = async (req, res) => {
  try {
    const { name, email, walletAddress } = req.body;

    // Check if wallet already exists in our array
    const existing = branches.find(b => b.walletAddress === walletAddress);
    if (existing)
      return res.status(400).json({ error: "Wallet already registered" });

    // Create new branch record
    const branch = { id: branches.length + 1, name, email, walletAddress };
    branches.push(branch);

    res.json({ status: "success", branch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get all branches
export const getBranches = async (req, res) => {
  try {
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
      value: formatEther(tx.value),
      time: tx.timestamp ? new Date(tx.timestamp * 1000) : null
    }));

    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
