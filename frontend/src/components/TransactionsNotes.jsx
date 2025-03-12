import React, { useState } from "react";
import { useDashboardContext } from "./DashboardContext"; // Importamos el contexto

export default function TransactionsNotes() {
  const { transactions, setTransactions } = useDashboardContext(); // Obtenemos las transacciones del contexto
  const [selectedDate, setSelectedDate] = useState("");

  // Organizar las transacciones por fecha sin modificar el estado original
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Filtrar transacciones según la fecha seleccionada
  const filteredTransactions = selectedDate
    ? sortedTransactions.filter((transaction) => {
      // Extraemos el componente fecha en formato yyyy-mm-dd para la comparación
      const transactionDate = new Date(transaction.date)
        .toISOString()
        .slice(0, 10);
      return transactionDate === selectedDate;
    })
    : sortedTransactions;

  // Función para eliminar una transacción
  const handleDelete = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="mt-6 mb-8 p-4 bg-white rounded-lg shadow-md">
      {/* Encabezado de la tarjeta con título y buscador de fecha a la derecha */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <input
          type="date"
          className="border border-gray-300 rounded-md px-2 py-1"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id || index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between"
            >
              {/* Información de la transacción */}
              <div className="flex flex-col w-full">
                <div className="font-semibold text-lg">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  {transaction.type === "income" ? "+" : "-"} {transaction.amount} €
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.description}
                </div>
              </div>

              {/* Contenedor para el indicador y el botón de eliminar */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1 font-semibold ${transaction.type === "income"
                    ? "text-green-700"
                    : "text-red-700"
                    }`}
                >
                  {transaction.type === "income" ? "↑" : "↓"}
                  {transaction.type === "income" ? "Income" : "Expense"}
                </div>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="bg-[#025963] text-white px-3 py-1 rounded-md hover:bg-[#013f48] transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No transactions yet.
          </p>
        )}
      </div>
    </div>
  );
}
