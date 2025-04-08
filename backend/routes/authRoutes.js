import express from "express";
import { register, login, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Usando la función register del controlador
router.post("/login", login); // Usando la función login del controlador
router.get("/verify", verifyToken); // Usando la función verifyToken del controlador

export default router;
