import express from "express";
import {
  register,
  login,
  updateUserProfile,
  getUserProfile,
  changePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../controllers/tokenUtils.js";
import { loginWithGoogle } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/google", loginWithGoogle);
router.get("/user", getUserProfile);
router.put("/user/:id", updateUserProfile);
router.put("/changepassword", changePassword);

export default router;
