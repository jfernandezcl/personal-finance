import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTransaction);

router.delete("/:id", authMiddleware, deleteTransaction);

router.get("/", authMiddleware, getTransactions);

export default router;
