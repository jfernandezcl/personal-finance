import jwt from "jsonwebtoken";
import { stringify } from "uuid";
import dotenv from "dotenv";

dotenv.config(); // si no lo has cargado en este archivo

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: stringify(user.id),
      username: user.username,
      email: user.email,
      provider: user.provider, // Asegúrate que user.provider venga de tu DB
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
