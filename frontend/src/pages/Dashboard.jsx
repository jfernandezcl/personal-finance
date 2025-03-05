// src/components/Dashboard.js

import React from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import CashFlowChart from "../components/CashFlowChart";
import IncomeExpenseCards from "../components/IncomeExpenseCards";
import TransactionsNotes from "../components/TransactionsNotes";
import { DashboardProvider } from "../components/DashboardContext";  // Importamos el proveedor
import TotalCardDay from "../components/TotalCardDay";

export default function Dashboard() {
  return (
    <DashboardProvider>  {/* Proveemos el contexto */}
      <div className="min-h-screen bg-gray-50 pb-14">
        <Header />
        <BalanceCard />
        <main className="max-w-6xl mx-auto space-y-8">
          {/* Separamos las tarjetas de la gráfica con flexbox */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CashFlowChart />
            </div>
            <div className="flex flex-col gap-6">
              <IncomeExpenseCards />
              <TotalCardDay />
            </div>
          </div>
          {/* Calendario de transacciones */}
          <TransactionsNotes />
        </main>
      </div>
    </DashboardProvider>
  );
}
