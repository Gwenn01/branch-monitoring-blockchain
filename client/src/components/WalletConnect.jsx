import { useState } from "react";
import { connectWallet } from "../utils/blockchain";

export default function WalletConnect({ onConnected }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async (walletType) => {
    try {
      setLoading(true);
      setError("");
      const wallet = await connectWallet(walletType);
      if (wallet) {
        setAccount(wallet.account);
        onConnected(wallet);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bgDark">
      <div className="bg-cardDark p-10 rounded-2xl shadow-xl w-80 text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Branch Monitor dApp
        </h1>

        <div className="space-y-3">
          <button
            onClick={() => handleConnect("metamask")}
            disabled={loading}
            className="bg-accent hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            {loading ? "Connecting..." : "Connect MetaMask"}
          </button>

          <button
            onClick={() => handleConnect("okx")}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            {loading ? "Connecting..." : "Connect OKX Wallet"}
          </button>
        </div>

        {account && (
          <p className="text-sm mt-3 text-gray-400">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
