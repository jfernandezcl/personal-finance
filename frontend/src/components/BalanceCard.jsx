import { useState } from "react";
import TransactionModal from "./TransactionModal";
import { useDashboardContext } from "../context/DashboardContext";

export default function BalanceCard() {
  const { setTransactions, totalBalance } = useDashboardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (transaction) => {
    try {
      if (!transaction) {
        throw new Error("Transaction data is required");
      }

      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#025963] text-white p-6 max-w-6xl mx-auto rounded-lg shadow mb-8">
      <div className="flex items-center justify-between">
        <div>
          Total Balance
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl font-bold">
              {isNaN(totalBalance) ? "0.00" : totalBalance.toFixed(2)} €
            </h1>

            <p
              className={`text-sm ${
                totalBalance >= 0 ? "text-green-200" : "text-red-500"
              }`}
            >
              {totalBalance >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(totalBalance).toFixed(2)}{" "}
            </p>
          </div>
        </div>
        <div className="space-x-3">
          <button
            className="bg-[#00d57d] hover:bg-[#00b569] transition px-4 py-2 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            + Add
          </button>
        </div>
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
