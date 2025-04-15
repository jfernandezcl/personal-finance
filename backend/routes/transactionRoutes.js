import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Agregar una nueva transacción
router.post("/", authMiddleware, addTransaction);

// Eliminar una transacción
router.delete("/:id", authMiddleware, deleteTransaction);

// Obtener transacciones del usuario autenticado
router.get("/", authMiddleware, getTransactions);

export default router;
