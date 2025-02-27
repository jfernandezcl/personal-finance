import React from "react";

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-end mb-8">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-semibold">Javi</span>
        <button className="px-4 py-2 bg-[#025963] text-white rounded-md">

          Log Out
        </button>
      </div>
    </header>
  );
}
