export const deleteTransactions = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(
      `http://localhost:3001/api/transactions/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error in deleting transaction");
    }

    return true;
  } catch (error) {
    console.error("Error when deleting transaction", error);
    return false;
  }
};
