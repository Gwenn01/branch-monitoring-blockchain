import { useEffect, useState } from "react";
import { getContract } from "../utils/blockchain";

export default function Dashboard({ wallet }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const contract = await getContract(wallet.signer);
        const data = await contract.getBranches(); // fetch mock branch list
        setBranches(data);
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };
    loadBranches();
  }, [wallet]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Total Branches</h3>
          <p className="text-3xl font-bold text-white">{branches.length || 0}</p>
        </div>
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Total Balance</h3>
          <p className="text-3xl font-bold text-white">
            ₱{branches.reduce((sum, b) => sum + Number(b.balance || 0), 0)}
          </p>
        </div>
        <div className="bg-cardDark p-4 rounded-xl">
          <h3 className="text-gray-400 text-sm">Connected Wallet</h3>
          <p className="text-sm text-gray-300">
            {wallet.account.slice(0, 6)}...{wallet.account.slice(-4)}
          </p>
        </div>
      </div>

      <div className="bg-cardDark p-4 rounded-xl">
        <h3 className="text-gray-400 text-sm mb-2">Branches Overview</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th>Name</th>
              <th>Wallet</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b, i) => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                <td>{b.name}</td>
                <td>{b.wallet}</td>
                <td>₱{b.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
