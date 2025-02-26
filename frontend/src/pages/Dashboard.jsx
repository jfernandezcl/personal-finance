import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

function Dashboard() {
  let userName = localStorage.getItem("username");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [ingresos, setIngresos] = useState(new Array(12).fill(0));
  const [gastos, setGastos] = useState(new Array(12).fill(0));
  const [inputValor, setInputValor] = useState("");
  const [tipo, setTipo] = useState("ingreso");
  const [mes, setMes] = useState(0);

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
        const nuevosIngresos = [...ingresos];
        nuevosIngresos[mes] += valor;
        setIngresos(nuevosIngresos);
      } else {
        const nuevosGastos = [...gastos];
        nuevosGastos[mes] += valor;
        setGastos(nuevosGastos);
      }
    }
    setInputValor("");
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Income",
        data: ingresos,
        backgroundColor: "#34D399",
      },
      {
        label: "Expenditure",
        data: gastos,
        backgroundColor: "#EF4444",
      },
    ],
  };

  const doughnutData = {
    labels: ["Income", "Expenditure"],
    datasets: [
      {
        data: [ingresos.reduce((acc, val) => acc + val, 0), gastos.reduce((acc, val) => acc + val, 0)],
        backgroundColor: ["#34D399", "#EF4444"],
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center mb-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold">Personal account of {userName || "al Dashboard"}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Log out
        </button>
      </div>

      {/* Fila superior: tarjeta de input y tarjeta de gráfica, con misma altura */}
      <div className="grid grid-cols-2 gap-4 mb-6 items-stretch w-full max-w-3xl">
        <div className="p-4 bg-white shadow rounded-lg text-center w-full">
          <h2 className="text-xl font-semibold">Add</h2>
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
            <option value="ingreso">Income</option>
            <option value="gasto">Expenditure</option>
          </select>
          <select
            value={mes}
            onChange={(e) => setMes(parseInt(e.target.value))}
            className="mt-2 p-2 border rounded w-full"
          >
            {barData.labels.map((mes, index) => (
              <option key={index} value={index}>{mes}</option>
            ))}
          </select>
          <button
            onClick={handleAgregar}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full"
          >
            Add
          </button>
        </div>
        <div className="p-4 bg-white shadow rounded-lg flex justify-center items-center w-full">
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-3xl">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-green-600">Income</h2>
          <p className="text-2xl font-bold">
            ${ingresos.reduce((acc, val) => acc + val, 0).toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-600">Expenditure</h2>
          <p className="text-2xl font-bold">
            ${gastos.reduce((acc, val) => acc + val, 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded-lg w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-2">Income vs Expenditure</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default Dashboard;
