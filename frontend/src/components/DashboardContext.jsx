import React, { useEffect, useState, createContext, useContext, useMemo } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Función para obtener las transacciones del usuario desde el backend
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/transactions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener las transacciones');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Agregar una nueva transacción al backend
  const addTransaction = async (newTransaction) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la transacción');
      }

      setTransactions((prev) => [...prev, newTransaction]); // Añadir a la lista
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Cargar transacciones cuando el usuario inicia sesión
  useEffect(() => {
    fetchTransactions();
  }, []);

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