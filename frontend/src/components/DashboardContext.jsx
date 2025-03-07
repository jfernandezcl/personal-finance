// DashboardContext.js
import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Convertimos transaction.amount a número para evitar concatenaciones
  const totalBalance = transactions.reduce((total, transaction) => {
    const amt = Number(transaction.amount); // o parseFloat(transaction.amount)
    return transaction.type === 'income'
      ? total + amt
      : total - amt;
  }, 0);

  return (
    <DashboardContext.Provider value={{ transactions, setTransactions, totalBalance }}>
      {children}
    </DashboardContext.Provider>
  );
};
