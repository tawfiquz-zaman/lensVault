import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic API route
app.get("/api", (req, res) => {
  res.json({
    message: "LensVault API is running",
  });
});

// Test API route
app.get("/api/test", (req, res) => {
  res.json({
    message: "React and Express are connected!",
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`LensVault backend running on port ${PORT}`);
});