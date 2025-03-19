import pool from '../database/db.js';

//Agregar una nueva transacción
export const addTransaction = async (req, res) => {
  const { type, amount, description, date } = req.body;
  const user_id = Buffer.from(req.userId, 'hex'); // Lo obtenemos del middleware de autenticación

  if (!type || !amount || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    await pool.execute(
      "INSERT INTO transactions (user_id, type, amount, description, date) VALUES (?, ?, ?, ?, ?)",
      [user_id, type, amount, description, date]
    );

    res.status(201).json({ msg: "Transaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Obtener transacciones del usuario autenticado
export const getTransactions = async (req, res) => {
  const user_id = Buffer.from(req.userId, 'hex');

  try {
    const [transactions] = await pool.execute(
      "SELECT BIN_TO_UUID(id) as id, type, amount, description, date FROM transactions WHERE user_id = ?",
      [user_id]
    );


    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};