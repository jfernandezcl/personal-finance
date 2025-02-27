import React from "react";

export default function IncomeExpenseCards() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-black">Income</p>
        <h3 className="text-xl font-bold text-black">12,378.20 €</h3>
        <span className="text-sm text-green-500 font-semibold">+450%</span>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-black">Expense</p>
        <h3 className="text-xl font-bold text-black">5,788.21 €</h3>
        <span className="text-sm text-red-500 font-semibold">-10%</span>
      </div>
    </div>
  );
}
