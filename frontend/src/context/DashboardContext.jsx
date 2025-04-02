import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { getTransactions } from "../infrastructure/transactions/getTransactions";
import { addTransaction } from "../infrastructure/transactions/addTransactions";
import { deleteTransactions } from "../infrastructure/transactions/deleteTransactions";

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Función para obtener las transacciones del usuario desde el backend
  const fetchTransactions = async () => {
    const data = await getTransactions();
    if (!data) return;
    setTransactions(data);
  };

  // Cargar transacciones cuando el usuario inicia sesión
  useEffect(() => {
    fetchTransactions();
  }, []);

  //Función para eliminar una transacción
  const removeTransaction = async (id) => {
    const success = await deleteTransactions(id);
    if (success) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    }
  };

  // Calculamos el balance total usando useMemo
  const totalBalance = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      const amt = Number(transaction.amount);
      return transaction.type === "income" ? total + amt : total - amt;
    }, 0);
  }, [transactions]);

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        setTransactions,
        addTransaction: (newTransactions) =>
          addTransaction(newTransactions, setTransactions),
        removeTransaction,
        totalBalance,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
