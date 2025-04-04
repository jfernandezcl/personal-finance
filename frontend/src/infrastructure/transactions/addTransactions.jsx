import { getTransactions } from "./getTransactions";

export const addTransaction = async (newTransaction, setTransactions) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Captura el mensaje de error del backend
      throw new Error(
        `Error en la solicitud: ${response.status} - ${errorMessage}`
      );
    }

    // Recargar la lista de transacciones desde el backend
    const updatedTransactions = await getTransactions();
    if (updatedTransactions) {
      setTransactions(updatedTransactions);
    }
  } catch (error) {
    console.error("Error when adding to the list:", error.message);
  }
};
