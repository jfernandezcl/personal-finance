import express from "express";
import {
  register,
  login,
  updateUserProfile,
  getUserProfile,
  changePassword,
  deleteAccount,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { verifyToken } from "../controllers/tokenUtils.js";
import { loginWithGoogle } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/google", loginWithGoogle);

// ————— RUTAS PROTEGIDAS —————
router.get("/user", authMiddleware, getUserProfile);
router.put("/user/:id", authMiddleware, updateUserProfile);
router.put("/changepassword", authMiddleware, changePassword);
router.delete("/delete", authMiddleware, deleteAccount);

export default router;
