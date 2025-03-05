import React from "react";
import { useDashboardContext } from "./DashboardContext"; // Importamos el contexto

export default function TransactionsNotes() {
  const { transactions, setTransactions } = useDashboardContext(); // Obtenemos las transacciones del contexto

  // Organizar las transacciones por fecha para mostrarlas en orden sin modificar el estado original
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Función para eliminar una transacción
  const handleDelete = (id) => {
    // Filtramos las transacciones y eliminamos la que coincida con el id
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id // Comparamos el id único de la transacción
    );
    setTransactions(updatedTransactions); // Actualizamos las transacciones en el contexto
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="space-y-4">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
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
                <div className="text-xs text-gray-500">{transaction.description}</div>
              </div>

              {/* Contenedor para la flecha, texto "Income/Expense" y el botón */}
              <div className="flex items-center gap-4">
                {/* Flecha + Texto "Income" o "Expense" */}
                <div
                  className={`flex items-center gap-1 font-semibold 
                  ${transaction.type === "income" ? "text-green-700" : "text-red-700"}`}
                >
                  {transaction.type === "income" ? "↑" : "↓"}
                  {transaction.type === "income" ? "Income" : "Expense"}
                </div>

                {/* Botón para eliminar la transacción */}
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
          <p className="text-center text-gray-500">No transactions yet.</p>
        )}
      </div>
    </div>

  );
}
