import { useState } from "react";
import { Menu } from "lucide-react"; // optional icon

export default function Sidebar({ active, setActive, disconnectWallet }) {
  const menus = ["Dashboard", "Transaction Explorer", "Branch Panel", "Settings"];
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-accent p-2 rounded-md text-white"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 top-0 left-0 h-full w-60 bg-cardDark p-4 flex flex-col justify-between transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <h1 className="text-xl font-semibold text-white mb-6">Branch</h1>
          {menus.map((m) => (
            <button
              key={m}
              onClick={() => {
                setActive(m);
                setOpen(false);
              }}
              className={`text-left w-full py-2 px-3 rounded-lg mb-1 transition-colors ${
                active === m
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={disconnectWallet}
          className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium transition-all"
        >
          Disconnect
        </button>
      </div>
    </>
  );
}
