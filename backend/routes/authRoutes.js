import express from "express";
import {
  register,
  login,
  updateUserProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../controllers/tokenUtils.js";
import { loginWithGoogle } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/google", loginWithGoogle);
//router.put("/user", updateUsername);
router.put("/user/:id", updateUserProfile);

export default router;
