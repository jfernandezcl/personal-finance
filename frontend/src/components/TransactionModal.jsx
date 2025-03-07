import React, { useEffect, useState } from "react";

function TransactionModal({ isOpen, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Restablecer los valores cuando la modal se abra o se recargue
  useEffect(() => {
    if (!isOpen) {
      setAmount("");
      setType("income");
      setDate("");
      setDescription("");
    }
  }, [isOpen]);

  // También restablecer los valores cuando la página se recargue
  useEffect(() => {
    setAmount("");
    setType("income");
    setDate("");
    setDescription("");
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!amount || isNaN(amount)) return; // Verificación básica

    onSave({
      amount: parseFloat(amount),
      type,
      date,
      description
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
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
          className="w-full p-2 mb-2 border rounded text-black"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded text-black"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
          <button onClick={() => onSave({ amount, type, date, description })} className="px-4 py-2 bg-[#025963] text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}


export default TransactionModal;