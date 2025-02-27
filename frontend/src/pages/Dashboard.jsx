import React from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import CashFlowChart from "../components/CashFlowChart";
import IncomeExpenseCards from "../components/IncomeExpenseCards";
import SummaryCards from "../components/SummaryCards";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header />
      <BalanceCard />
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CashFlowChart />
          <IncomeExpenseCards />
        </div>
        <SummaryCards />
      </main>
    </div>
  );
}
