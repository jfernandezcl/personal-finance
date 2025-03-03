import React from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import CashFlowChart from "../components/CashFlowChart";
import IncomeExpenseCards from "../components/IncomeExpenseCards";
import SummaryCards from "../components/SummaryCards";
import TransactionModal from "../components/TransactionModal";
import Calendar from "../components/Calendar";
import { DashboardProvider } from "../components/DashboardContext";  // Importamos el proveedor

export default function Dashboard() {
  return (
    <DashboardProvider>  {/* Proveemos el contexto */}
      <div className="min-h-screen bg-gray-50 p-6">
        <Header />
        <BalanceCard />
        <main className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CashFlowChart />
            <IncomeExpenseCards />
          </div>
          <SummaryCards />
          {/* Calendario de transacciones */}
          <Calendar />
        </main>
      </div>
    </DashboardProvider>
  );
}
