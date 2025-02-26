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

// Datos de ejemplo para la gráfica de barras:
// Valores positivos para Income y negativos para Expense.
const dataBar = {
  labels: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  datasets: [
    {
      label: "Income",
      data: [5000, 7000, 6500, 8000, 7500, 9000, 8500, 9500, 9000, 10000, 11000, 10500],
      backgroundColor: "#10B981",
    },
    {
      label: "Expense",
      data: [-3000, -4000, -3500, -4500, -4200, -4800, -4700, -5000, -4600, -5100, -5300, -5200],
      backgroundColor: "#EF4444",
    },
  ],
};

const optionsBar = {
  responsive: true,
  scales: {
    y: {
      // Con datos negativos, Chart.js ajusta automáticamente el eje
      beginAtZero: true,
      ticks: {
        color: "#4B5563",
      },
      grid: {
        color: "#E5E7EB",
      },
    },
    x: {
      ticks: {
        color: "#4B5563",
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header con nombre de usuario y botón de Log Out */}
      <header className="max-w-6xl mx-auto flex items-center justify-end mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-semibold">Javi</span>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Log Out
          </button>
        </div>
      </header>

      {/* Tarjeta Superior */}
      <div className="bg-green-700 text-white p-6 max-w-6xl mx-auto rounded-lg shadow mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">€320,845.20</h1>
            <p className="text-sm text-green-200">15.9% ↑</p>
          </div>
          <div className="space-x-3">
            <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
              + Add
            </button>
            <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
              Send
            </button>
            <button className="bg-green-800 hover:bg-green-900 transition px-4 py-2 rounded-md">
              Request
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor Principal */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* Sección de Cash Flow e Income/Expense */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfica de Barras */}
          <div className="bg-white rounded-lg shadow p-6 col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Cash Flow</h2>
              <div className="flex space-x-2 text-sm text-gray-500">
                <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  Weekly
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  Daily
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  Manage
                </button>
              </div>
            </div>
            <Bar data={dataBar} options={optionsBar} />
          </div>

          {/* Income & Expense - dividido en dos tarjetas apiladas */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-semibold text-gray-400">Income</p>
              <h3 className="text-xl font-bold text-gray-800">€12,378.20</h3>
              <span className="text-sm text-green-500 font-semibold">+450%</span>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-semibold text-gray-400">Expense</p>
              <h3 className="text-xl font-bold text-gray-800">€5,788.21</h3>
              <span className="text-sm text-red-500 font-semibold">-10%</span>
            </div>
          </div>
        </div>

        {/* Tarjetas inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-400">Business account</p>
            <h4 className="text-lg font-semibold text-gray-700">€8,672.20</h4>
            <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-400">Total Saving</p>
            <h4 className="text-lg font-semibold text-gray-700">€3,765.35</h4>
            <p className="text-sm text-gray-400 mt-1">vs. 4,116.50 Last Period</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-400">Tax Reserve</p>
            <h4 className="text-lg font-semibold text-gray-700">€14,376.16</h4>
            <p className="text-sm text-gray-400 mt-1">vs. 10,325.46 Last Period</p>
          </div>
        </div>
      </main>
    </div>

  );
}
