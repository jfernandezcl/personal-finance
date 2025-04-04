import pool from "../database/db.js";

//Agregar una nueva transacción
export const addTransaction = async (req, res) => {
  const { type, amount, description, date } = req.body;
  const user_id = Buffer.from(req.userId, "hex"); // Lo obtenemos del middleware de autenticación

  if (!type || !amount || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO transactions (id, user_id, type, amount, description, date) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?)",
      [user_id, type, amount, description, date]
    );

    const [rows] = await pool.execute(
      "SELECT BIN_TO_UUID(id) AS id FROM transactions WHERE user_id = ? ORDER BY date DESC LIMIT 1",
      [user_id]
    );
    if (rows.length === 0) {
      throw new Error("Transaction not found after insert");
    }

    res
      .status(201)
      .json({ id: rows[0].id, msg: "Transaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const user_id = Buffer.from(req.userId, "hex");

  try {
    const [result] = await pool.execute(
      "DELETE FROM transactions WHERE id = UUID_TO_BIN(?) AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Obtener transacciones del usuario autenticado
export const getTransactions = async (req, res) => {
  const user_id = Buffer.from(req.userId, "hex");

  try {
    const [transactions] = await pool.execute(
      "SELECT BIN_TO_UUID(id) as id, type, amount, description, date FROM transactions WHERE user_id = ?",
      [user_id]
    );

    // Convierte amount a un número antes de enviarlo al frontend
    const formattedTransactions = transactions.map((t) => ({
      ...t,
      amount: parseFloat(t.amount), // Convertimos amount a número
    }));

    res.json(formattedTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
