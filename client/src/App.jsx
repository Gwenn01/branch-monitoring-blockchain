import { useState } from "react";
import Sidebar from "./components/Sidebar";
import WalletConnect from "./components/WalletConnect";
import Dashboard from "./components/Dashboard";
import BranchPanel from "./components/BranchPanel";
import TransactionExplorer from "./components/TransactionExplorer";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [active, setActive] = useState("Dashboard");

  const disconnectWallet = () => {
    // Optional: clear MetaMask connection info
    if (window.ethereum && window.ethereum.selectedAddress) {
      window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }

    setWallet(null);
    setActive("Dashboard");
  };

  if (!wallet) return <WalletConnect onConnected={setWallet} />;

  return (
    <div className="flex">
      <Sidebar
        active={active}
        setActive={setActive}
        disconnectWallet={disconnectWallet}
      />
      <main className="flex-1 bg-bgDark min-h-screen overflow-y-auto">
        {active === "Dashboard" && <Dashboard wallet={wallet} />}
        {active === "Transaction Explorer" && (
          <TransactionExplorer wallet={wallet} />
        )}
        {active === "Branch Panel" && <BranchPanel wallet={wallet} />}
      </main>
    </div>
  );
}
