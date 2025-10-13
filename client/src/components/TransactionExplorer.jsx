import { useEffect, useState } from "react";
import { fetchBranches } from "../utils/api";
import { fetchTxHistory } from "../utils/fetchTxHistory";

export default function TransactionExplorer() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const branches = await fetchBranches();

        // Make a map for quick lookup of branch name by wallet
        const branchMap = {};
        branches.forEach((b) => {
          branchMap[b.walletAddress.toLowerCase()] = b.name;
        });

        // Fetch transactions for all registered wallets
        const allTxs = [];
        for (const branch of branches) {
          const txs = await fetchTxHistory(branch.walletAddress);
          txs.forEach((tx) => {
            allTxs.push({
              ...tx,
              branch:
                branchMap[tx.from] ||
                branchMap[tx.to] ||
                "Unknown",
            });
          });
        }

        // Sort by most recent
        allTxs.sort((a, b) => new Date(b.time) - new Date(a.time));
        setTransactions(allTxs);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        Transaction Explorer
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <div className="bg-cardDark rounded-xl p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-2 text-left">Hash</th>
                <th className="p-2 text-left">From</th>
                <th className="p-2 text-left">To</th>
                <th className="p-2 text-left">Amount (ETH)</th>
                <th className="p-2 text-left">Branch</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-2 text-blue-400">
                    {tx.hash.slice(0, 8)}...
                  </td>
                  <td className="p-2">{tx.from.slice(0, 6)}...</td>
                  <td className="p-2">{tx.to?.slice(0, 6)}...</td>
                  <td className="p-2">₱{tx.value}</td>
                  <td
                    className={`p-2 ${
                      tx.branch === "Unknown"
                        ? "text-gray-400"
                        : "text-green-400"
                    }`}
                  >
                    {tx.branch}
                  </td>
                  <td className="p-2">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
