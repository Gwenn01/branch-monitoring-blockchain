import { useState } from "react";

export default function Sidebar({ active, setActive }) {
  const menus = ["Dashboard", "Transaction Explorer", "Branch Panel", "Settings"];

  return (
    <div className="w-60 bg-cardDark h-screen p-4 flex flex-col">
      <h1 className="text-xl font-semibold text-white mb-6">Branch</h1>
      {menus.map((m) => (
        <button
          key={m}
          onClick={() => setActive(m)}
          className={`text-left py-2 px-3 rounded-lg mb-1 ${
            active === m ? "bg-accent text-white" : "text-gray-400 hover:bg-gray-700"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
