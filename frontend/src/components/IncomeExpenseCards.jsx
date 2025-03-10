import React from "react";
import { useDashboardContext } from "./DashboardContext";

export default function IncomeExpenseCards() {
  const { transactions } = useDashboardContext();

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-black">Income</p>
        <h3 className="text-xl font-bold text-black">{income.toFixed(2)} €</h3>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-black">Expense</p>
        <h3 className="text-xl font-bold text-black">{expense.toFixed(2)} €</h3>
      </div>
    </div>
  );
}
