import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dataBar = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    { label: "Income", data: [5000, 7000, 6500, 8000, 7500, 9000, 8500, 9500, 9000, 10000, 11000, 10500], backgroundColor: "#055765" },
    { label: "Expense", data: [-3000, -4000, -3500, -4500, -4200, -4800, -4700, -5000, -4600, -5100, -5300, -5200], backgroundColor: "#00d77d" },
  ],
};

const optionsBar = {
  responsive: true,
  scales: {
    y: { beginAtZero: true, ticks: { color: "#085565" }, grid: { color: "#E5E7EB" } },
    x: { ticks: { color: "#085565" }, grid: { display: false } },
  },
  plugins: { legend: { display: true } },
};

export default function CashFlowChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Cash Flow</h2>
        <div className="flex space-x-2 text-sm text-gray-500">
          <button className="px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200">Weekly</button>
          <button className="px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200">Daily</button>
          <button className="px-3 py-1 bg-gray-100 text-black rounded hover:bg-gray-200">Manage</button>

        </div>
      </div>
      <Bar data={dataBar} options={optionsBar} />
    </div>
  );
}
