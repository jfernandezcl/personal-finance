import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

function Dashboard() {
  let userName = localStorage.getItem("username");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ingresos, setIngresos] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [inputValor, setInputValor] = useState("");
  const [tipo, setTipo] = useState("ingreso");

  if (!token) {
    navigate("/", { replace: true });
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleAgregar = () => {
    const valor = parseFloat(inputValor.replace(/[^0-9.,]/g, "").replace(",", "."));
    if (!isNaN(valor)) {
      if (tipo === "ingreso") {
        setIngresos(ingresos + valor);
      } else {
        setGastos(gastos + valor);
      }
    }
    setInputValor("");
  };

  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        label: "Ingresos",
        data: new Array(12).fill(ingresos),
        backgroundColor: "#34D399",
      },
      {
        label: "Gastos",
        data: new Array(12).fill(gastos),
        backgroundColor: "#EF4444",
      },
    ],
  };

  const doughnutData = {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        data: [ingresos, gastos],
        backgroundColor: ["#34D399", "#EF4444"],
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenido {userName || "al Dashboard"}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >Log out</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 items-center">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold">Añadir Monto</h2>
          <input
            type="text"
            value={inputValor}
            onChange={(e) => setInputValor(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Ej: 12,80€"
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          >
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
          <button
            onClick={handleAgregar}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full"
          >Añadir</button>
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex justify-center items-center w-40 h-40">
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-600">Ingresos</h2>
          <p className="text-2xl font-bold">${ingresos.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-600">Gastos</h2>
          <p className="text-2xl font-bold">${gastos.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Ingresos vs Gastos</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default Dashboard;
