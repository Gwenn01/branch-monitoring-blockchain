import { useState } from "react";
import { connectWallet } from "../utils/blockchain";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const wallet = await connectWallet();
      if (wallet) {
        setAccount(wallet.account);
        onConnected(wallet);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgDark">
      <div className="bg-cardDark p-10 rounded-2xl shadow-xl w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Branch Monitor dApp</h1>
        <button
          onClick={handleConnect}
          disabled={loading}
          className="bg-accent hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
        {account && (
          <p className="text-sm mt-3 text-gray-400">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}
