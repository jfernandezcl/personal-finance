import React from "react";

export default function SummaryCards() {
  return (
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
  );
}
