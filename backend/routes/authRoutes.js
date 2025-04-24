import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../controllers/tokenUtils.js";
import { loginWithGoogle } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.post("/google", loginWithGoogle);
router.put("/user", updateUsername); // importar

export default router;
