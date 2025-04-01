import { useEffect, useState } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import ErrorAlert from "../alerts/ErrorAlert";

function TransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useDashboardContext();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setType("income");
      setDate(today);
      setDescription("");
    }
  }, [isOpen, today]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const newTransaction = {
      amount: parseFloat(amount),
      type,
      date,
      description,
    };

    await addTransaction(newTransaction);

    onClose(); // Cerrar la modal después de guardar
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-black">Add Transaction</h2>
        <input
          type="number"
          placeholder="Amount 12.50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black cursor-pointer"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          className="w-full p-2 mb-2 border rounded text-black cursor-pointer"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#025963] text-white rounded hover:bg-[#013f48] transition-colors"
          >
            Save
          </button>
        </div>
        {error && <ErrorAlert error={error} onClose={() => setError("")} />}
      </div>
    </div>
  );
}

export default TransactionModal;
