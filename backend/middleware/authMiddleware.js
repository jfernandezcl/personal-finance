import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { stringify } from "uuid";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    req.userId = Buffer.isBuffer(user.id) ? stringify(user.id) : user.id;

    next();
  });
};

export default authMiddleware;
