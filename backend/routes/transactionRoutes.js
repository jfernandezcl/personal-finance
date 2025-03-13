import express from 'express';
import { addTransaction, getTransactions } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Agregar una nueva transacción
router.post('/', authMiddleware, addTransaction);

// Obtener transacciones del usuario autenticado
router.get('/', authMiddleware, getTransactions);

export default router;