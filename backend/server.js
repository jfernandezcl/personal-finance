import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import corsMiddleware from "./middleware/cors.js";
import { googleAuthRoutes } from "./controllers/googleAuthController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(corsMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);

// Agregar las rutas de transacciones
app.use("/api/transactions/", transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
