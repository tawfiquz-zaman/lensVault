import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPhoto,
  getPhotos,
} from "../controllers/photoController.js";

const router = express.Router();

// ========================================
// Protected Photo Routes
// ========================================

// Create Photo
router.post("/", authMiddleware, createPhoto);

// Get Current User Photos
router.get("/", authMiddleware, getPhotos);

export default router;

