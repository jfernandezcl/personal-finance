export const addTransaction = async (newTransaction, setTransactions) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:3001/api/transactions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la transacción");
    }

    setTransactions((prev) => [...prev, newTransaction]); // Añadir a la lista
  } catch (error) {
    console.error("Error:", error);
  }
};
