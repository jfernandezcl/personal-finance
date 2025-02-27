import React from "react";

export default function BalanceCard() {
  return (
    <div className="bg-green-700 text-white p-6 max-w-6xl mx-auto rounded-lg shadow mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">€320,845.20</h1>
          <p className="text-sm text-green-200">15.9% ↑</p>
        </div>
        <div className="space-x-3">
          <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
            + Add
          </button>
          <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
            Send
          </button>
          <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
            Request
          </button>
        </div>
      </div>
    </div>
  );
}
