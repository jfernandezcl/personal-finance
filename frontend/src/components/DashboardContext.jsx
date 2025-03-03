import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

// Creamos el proveedor del contexto
export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <DashboardContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </DashboardContext.Provider>
  );
};
