
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch all branches
export async function fetchBranches() {
  const res = await fetch(`${API_URL}/branches`);
  if (!res.ok) throw new Error("Failed to load branches");
  return await res.json();
}

// Add a new branch
export async function createBranch(data) {
  const res = await fetch(`${API_URL}/branches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error adding branch");
  return json.branch;
}

// Fetch wallet transaction history
export async function fetchTransactions(walletAddress) {
  const res = await fetch(`${API_URL}/transactions/${walletAddress}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
}
