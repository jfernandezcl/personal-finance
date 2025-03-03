import { useState } from "react";
import TransactionModal from "./TransactionModal";

export default function BalanceCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (transaction) => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#025963] text-white p-6 max-w-6xl mx-auto rounded-lg shadow mb-8">
      <div className="flex items-center justify-between">
        <div>
          Total Balance
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl font-bold">320,845.20 €</h1>
            <p className="text-sm text-green-200">15.9% ↑</p>
          </div>
        </div>
        <div className="space-x-3">
          <button
            className="bg-[#00d57d] hover:bg-[#1f5b63] transition px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            + Add
          </button>
        </div>
      </div>
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
}