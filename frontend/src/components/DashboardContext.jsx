import React, { useEffect, useState, createContext, useContext, useMemo } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Función para agregar una nueva transacción
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  // Calculamos el balance total usando useMemo
  const totalBalance = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      const amt = Number(transaction.amount);
      return transaction.type === 'income' ? total + amt : total - amt;
    }, 0);
  }, [transactions]);

  return (
    <DashboardContext.Provider value={{ transactions, setTransactions, addTransaction, totalBalance }}>
      {children}
    </DashboardContext.Provider>
  );
};