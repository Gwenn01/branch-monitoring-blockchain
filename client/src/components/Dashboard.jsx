import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { fetchBranches, createBranch } from "../utils/api";

export default function Dashboard({ wallet }) {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", walletAddress: "" });
  const [loading, setLoading] = useState(false);

  // Load branches from backend
  useEffect(() => {
    const loadBranches = async () => {
      try {
        const data = await fetchBranches();

        // Fetch live balances for each branch wallet
        const provider = new ethers.BrowserProvider(window.ethereum);
        const withBalances = await Promise.all(
          data.map(async (b) => {
            const balanceWei = await provider.getBalance(b.walletAddress);
            const balanceEth = Number(ethers.formatEther(balanceWei));
            return { ...b, balance: balanceEth };
          })
        );

        setBranches(withBalances);
      } catch (err) {
        console.error("Error loading branches:", err);
      }
    };
    loadBranches();
  }, []);

  // Add new branch
  const handleAddBranch = async (e) => {
    e.preventDefault();
    if (!form.name || !form.walletAddress) return alert("All fields required!");

    try {
      setLoading(true);
      const branch = await createBranch(form);

      // Fetch its wallet balance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(branch.walletAddress);
      const balanceEth = Number(ethers.formatEther(balanceWei));

      setBranches((prev) => [...prev, { ...branch, balance: balanceEth }]);
      setForm({ name: "", email: "", walletAddress: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalBalance = branches.reduce((sum, b) => sum + b.balance, 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Total Branches</h3>
          <p className="text-3xl font-bold text-white">{branches.length}</p>
        </div>
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Total Balance</h3>
          <p className="text-3xl font-bold text-white">
            ₱{totalBalance.toFixed(4)}
          </p>
        </div>
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Connected Wallet</h3>
          <p className="text-sm text-gray-300">
            {wallet.account.slice(0, 6)}...{wallet.account.slice(-4)}
          </p>
        </div>
      </div>

      {/* Add Branch Form */}
      <div className="bg-cardDark p-4 rounded-xl space-y-4">
        <h3 className="text-gray-400 text-sm">Add New Branch</h3>
        <form onSubmit={handleAddBranch} className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Branch Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Branch Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Wallet Address"
            value={form.walletAddress}
            onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
            className="bg-gray-800 text-white rounded-lg p-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="col-span-3 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Branch"}
          </button>
        </form>
      </div>

      {/* Branch Table */}
      <div className="bg-cardDark p-4 rounded-xl">
        <h3 className="text-gray-400 text-sm mb-2">Branches Overview</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Wallet</th>
              <th className="text-left p-2">Balance (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b, i) => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.email}</td>
                <td className="p-2 text-blue-400">{b.walletAddress}</td>
                <td className="p-2">₱{b.balance.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
