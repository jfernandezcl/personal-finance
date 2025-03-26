export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:3001/api/transactions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las transacciones");
    }

    const data = await response.json();
    console.log("Transacciones recibidas desde el backend:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
