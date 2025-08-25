import { useState } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { useTranslation } from "react-i18next";

export default function TransactionsNotes() {
  const { transactions, removeTransaction } = useDashboardContext();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { t, i18n } = useTranslation();

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const filteredTransactions = selectedDate
    ? sortedTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
          .toISOString()
          .slice(0, 10);
        return transactionDate === selectedDate;
      })
    : sortedTransactions;

  const handleDelete = async (id) => {
    await removeTransaction(id);
  };

  return (
    <div className="mt-6 mb-8 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {t("dashboardPage.transactionNotes.transactions")}
        </h2>
        <input
          type="date"
          className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
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
              <div className="flex flex-col w-full">
                <div className="font-semibold text-lg">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  {transaction.type === "income" ? "+" : "-"}{" "}
                  {transaction.amount} €
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.description}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1 font-semibold ${
                    transaction.type === "income"
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
                  {t("dashboardPage.transactionNotes.delete")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {t("dashboardPage.transactionNotes.notransaction")}
          </p>
        )}
      </div>
    </div>
  );
}
