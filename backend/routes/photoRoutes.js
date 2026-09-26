import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createPhoto,
  getPhotos,
} from "../controllers/photoController.js";

import {
  uploadPhoto,
} from "../controllers/uploadController.js";

const router = express.Router();

// ========================================
// Upload Photo
// ========================================
router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadPhoto
);

// ========================================
// Create Photo
// ========================================
router.post("/", authMiddleware, createPhoto);

// ========================================
// Get Current User Photos
// ========================================
router.get("/", authMiddleware, getPhotos);

export default router;

