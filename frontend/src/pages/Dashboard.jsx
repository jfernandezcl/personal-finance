import React from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import CashFlowChart from "../components/CashFlowChart";
import IncomeExpenseCards from "../components/IncomeExpenseCards";
import TransactionsNotes from "../components/TransactionsNotes";
import { DashboardProvider } from "../context/DashboardContext";
import TotalCardDay from "../components/TotalCardDay";
import ProtectedRoute from "../authenticity/ProtectedRoute";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 pb-14">
          <Header />
          <BalanceCard />
          <main className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CashFlowChart />
              </div>
              <div className="flex flex-col gap-6">
                <IncomeExpenseCards />
                <TotalCardDay />
              </div>
            </div>
            <TransactionsNotes />
          </main>
        </div>
      </ProtectedRoute>
    </DashboardProvider>
  );
}
