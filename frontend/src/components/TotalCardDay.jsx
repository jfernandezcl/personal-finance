import { useState, useEffect } from "react";
import totalCard from "../images/total-card.svg";
import { useDashboardContext } from "../context/DashboardContext"; // Obtenemos transacciones desde el contexto

export default function TotalCardDay() {
  const { transactions } = useDashboardContext();
  const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today); // Estado para la fecha seleccionada
  const [dailyData, setDailyData] = useState({ income: 0, expense: 0 }); // Datos de ingresos y gastos

  useEffect(() => {
    // Filtrar transacciones del día seleccionado
    const filteredTransactions = (transactions || []).filter((transaction) => {
      const transactionDate = new Date(transaction.date)
        .toISOString()
        .split("T")[0];
      return transactionDate === selectedDate;
    });

    // Sumar ingresos y gastos (convirtiendo el monto a número)
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    setDailyData({ income, expense });
  }, [selectedDate, transactions]);

  return (
    <div className="flex flex-col flex-grow">
      <div className="bg-white rounded-lg shadow p-6 h-full relative">
        {/* Selector de fecha */}
        <input
          type="date"
          className="absolute top-4 right-4 bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-sm"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Mostrar ingresos y gastos si hay datos */}
        <p className="text-sm font-semibold text-black">Daily Overview</p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-[#025963f8]">Income</p>
          <h3 className="text-xl font-bold text-black">
            {dailyData.income > 0
              ? `${dailyData.income.toFixed(2)} €`
              : "0.00 €"}
          </h3>
          {dailyData.income > 0 && (
            <span className="text-sm text-green-500 font-semibold">
              +{(dailyData.income / 100).toFixed(1)}%
            </span>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-green-500">Expense</p>
          <h3 className="text-xl font-bold text-black">
            {dailyData.expense > 0
              ? `${dailyData.expense.toFixed(2)} €`
              : "0.00 €"}
          </h3>
          {dailyData.expense > 0 && (
            <span className="text-sm text-red-500 font-semibold">
              -{(dailyData.expense / 100).toFixed(1)}%
            </span>
          )}
        </div>

        {/* Imagen en la esquina inferior derecha */}
        <img
          src={totalCard}
          alt="illustration card"
          className="absolute bottom-7 right-7 w-28 h-28 opacity-70"
        />
      </div>
    </div>
  );
}
