// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stringRoutes from "./Routes/string.routes.js";

dotenv.config();

const app = express();
app.use (cors());
app.use(express.json());
app.use("/api/strings", stringRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

