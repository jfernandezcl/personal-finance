import bcrypt from "bcryptjs";
import {
  generateToken,
  verifyToken as verifyTokenUtil,
} from "../utils/tokenUtils.js";
import pool from "../database/db.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are mandatory" });
  }

  try {
    // verificar si existe el usuario
    const [existinUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existinUser.length > 0) {
      return res.status(409).json({ msg: "The user already exists" });
    }

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // guardar usuario en la base de datos
    const [result] = await pool.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ msg: "User registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are mandatory" });
  }

  try {
    // verificar si existe el usuario
    const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length === 0) {
      return res.status(401).json({ msg: "Email or password is incorrect" });
    }
    const user = existingUser[0];

    // verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Email or password is incorrect" });
    }

    const token = generateToken(user);
    res.status(200).json({ token, username: user.username });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};
