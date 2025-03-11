import React, { createContext, useContext, useState, useMemo } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Usamos useMemo para memorizar el totalBalance
  const totalBalance = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      const amt = Number(transaction.amount); // Convertimos a número
      return transaction.type === 'income' ? total + amt : total - amt;
    }, 0);
  }, [transactions]); // Solo se vuelve a calcular si las transacciones cambian

  return (
    <DashboardContext.Provider value={{ transactions, setTransactions, totalBalance }}>
      {children}
    </DashboardContext.Provider>
  );
};
