import bcrypt from "bcryptjs";
import { generateToken } from "./tokenUtils.js";
import pool from "../database/db.js";
import { parse as uuidParse } from "uuid";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are mandatory" });
  }

  try {
    const [existinUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existinUser.length > 0) {
      return res.status(409).json({ msg: "The user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length === 0) {
      return res.status(401).json({ msg: "Email or password is incorrect" });
    }
    const user = existingUser[0];

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: "Email or password is incorrect" });
    }

    const token = generateToken(user);
    res.status(200).json({ token, username: user.username, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, email, phone, bio } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  try {
    const userId = parse(id);

    const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    if (existingUser.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    await pool.execute(
      "UPDATE users SET username = ?, email = ?, phone = ?, bio = ? WHERE id = ?",
      [username, email, phone, bio, userId]
    );
    res.status(200).json({ msg: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userIdString = req.userId;
    if (!userIdString) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const userId = parse(userIdString);
    const [rows] = await pool.execute(
      "SELECT username, email, phone, bio FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userIdString = req.userId;
  if (!userIdString) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  try {
    const userId = parse(userIdString);
    const [rows] = await pool.execute(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    const user = rows[0];
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    await pool.execute("DELETE FROM transactions WHERE user_id = ?", [userId]);

    const userIdBinary = Buffer.from(uuidParse(userId));
    await pool.execute("DELETE FROM users WHERE id = ?", [userIdBinary]);
    res.status(200).json({ msg: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
