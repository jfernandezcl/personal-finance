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
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
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
      t("dashboardPage.cashflow.months.january"),
      t("dashboardPage.cashflow.months.february"),
      t("dashboardPage.cashflow.months.march"),
      t("dashboardPage.cashflow.months.april"),
      t("dashboardPage.cashflow.months.may"),
      t("dashboardPage.cashflow.months.june"),
      t("dashboardPage.cashflow.months.july"),
      t("dashboardPage.cashflow.months.august"),
      t("dashboardPage.cashflow.months.september"),
      t("dashboardPage.cashflow.months.october"),
      t("dashboardPage.cashflow.months.november"),
      t("dashboardPage.cashflow.months.december"),
    ],

    datasets: [
      {
        label: t("dashboardPage.cashflow.income"),
        data: incomeData,
        backgroundColor: "#055765",
      },
      {
        label: t("dashboardPage.cashflow.expense"),
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
        <h2 className="text-lg font-semibold text-black">
          {t("dashboardPage.cashflow.title")}
        </h2>
      </div>
      <Bar data={dataBar} options={optionsBar} />
    </div>
  );
}
