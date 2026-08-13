const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allow requests from the React frontend
app.use(cors());

// Allow the server to receive JSON data
app.use(express.json());

// Basic API test route
app.get("/api", (req, res) => {
  res.json({
    message: "LensVault API is running",
  });
});

// Server port
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`LensVault backend running on port ${PORT}`);
});