import React, { useState, useEffect } from "react";
import totalCard from "../images/total-card.svg";

export default function TotalCardDay() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dailyData, setDailyData] = useState({ income: 0, expense: 0 });

  const fetchDailyData = async (date) => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions?date=${date}`);
      const data = await response.json();

      setDailyData({
        income: data.income || 0,
        expense: data.expense || 0,
      });
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchDailyData(selectedDate);
    }
  }, [selectedDate]);

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

        {/* Income y Expense del día seleccionado */}
        <p className="text-sm font-semibold text-black">
          Daily Overview
        </p>

        <div className="mt-4">
          <p className="text-sm font-semibold text-black">Income</p>
          <h3 className="text-xl font-bold text-black">{dailyData.income} €</h3>
          <span className="text-sm text-green-500 font-semibold">+{(dailyData.income / 100).toFixed(1)}%</span>
        </div>

        <div className="mt-4">
          <p className="text-sm font-semibold text-black">Expense</p>
          <h3 className="text-xl font-bold text-black">{dailyData.expense} €</h3>
          <span className="text-sm text-red-500 font-semibold">-{(dailyData.expense / 100).toFixed(1)}%</span>
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
