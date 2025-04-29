import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import corsMiddleware from "./middleware/cors.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use("/api/auth", authRoutes);

app.use("/api/transactions/", transactionRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
