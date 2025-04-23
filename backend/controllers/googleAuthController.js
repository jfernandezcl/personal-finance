// controllers/googleAuthController.js
import pool from "../database/db.js";
import { generateToken } from "./tokenUtils.js";
import { verifyGoogleToken } from "./authGoogle.js"; // el que tú ya tienes creado

export const loginWithGoogle = async (req, res) => {
  console.log(req.body);
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ msg: "Missing Google credential token" });
  }

  try {
    const { sub, email, name } = await verifyGoogleToken(credential);

    // Verificar si el usuario ya existe
    const [userRows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let user = userRows[0];

    if (!user) {
      const [insertResult] = await pool.execute(
        "INSERT INTO users (sub, username, email) VALUES (?, ?, ?)",
        [sub, name, email]
      );
      const [newUserRows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [insertResult.insertId]
      );
      user = newUserRows[0];
    }

    // Generar JWT como en el login normal
    const token = generateToken(user);

    res.status(200).json({ token, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid Google token" });
  }
};

export default loginWithGoogle;
