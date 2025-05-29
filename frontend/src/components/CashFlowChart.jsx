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
import { useDashboardContext } from "../context/DashboardContext";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CashFlowChart() {
  const { transactions } = useDashboardContext();

  const { incomeData, expenseData } = useMemo(() => {
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    transactions.forEach(({ amount, type, date }) => {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        console.error(`Invalid date: ${date}`);
        return;
      }
      const month = parsedDate.getMonth();

      if (type === "income") {
        monthlyIncome[month] += amount;
      } else {
        monthlyExpenses[month] += amount;
      }
    });

    return { incomeData: monthlyIncome, expenseData: monthlyExpenses };
  }, [transactions]);

  const dataBar = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#055765",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#00d77d",
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#085565" },
        grid: { color: "#E5E7EB" },
      },
      x: { ticks: { color: "#085565" }, grid: { display: false } },
    },
    plugins: { legend: { display: true } },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Cash Flow</h2>
      </div>
      <Bar data={dataBar} options={optionsBar} />
    </div>
  );
}
