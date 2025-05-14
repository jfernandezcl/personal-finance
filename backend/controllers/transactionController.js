import pool from "../database/db.js";

export const addTransaction = async (req, res) => {
  const { type, amount, description, date } = req.body;
  const user_id = req.userId;

  if (!type || !amount || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO transactions (id, user_id, type, amount, description, date) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, ?, ?, ?)",
      [user_id, type, amount, description, date]
    );

    const [rows] = await pool.execute(
      "SELECT BIN_TO_UUID(id) AS id FROM transactions WHERE user_id = UUID_TO_BIN(?) ORDER BY date DESC LIMIT 1",
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
  const user_id = req.userId;

  try {
    const [result] = await pool.execute(
      "DELETE FROM transactions WHERE id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)",
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

export const getTransactions = async (req, res) => {
  const user_id = req.userId;

  try {
    const [transactions] = await pool.execute(
      "SELECT BIN_TO_UUID(id) as id, type, amount, description, date FROM transactions WHERE user_id = UUID_TO_BIN(?)",
      [user_id]
    );

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      amount: parseFloat(t.amount),
    }));

    res.json(formattedTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
