import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();

    res.status(200).json({
      message: "Cloudinary connection successful.",
      status: result.status,
    });
  } catch (error) {
    console.error("Cloudinary Test Error:", error);

    res.status(500).json({
      message: "Cloudinary connection failed.",
    });
  }
});

export default router;

