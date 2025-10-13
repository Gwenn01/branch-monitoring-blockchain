import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Branch", BranchSchema);
