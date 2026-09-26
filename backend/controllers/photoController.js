import Photo from "../models/Photo.js";

// ========================================
// Create Photo
// ========================================
export const createPhoto = async (req, res) => {
  try {
    const {
      imageUrl,
      publicId,
      filename,
      title,
      description,
      tags,
    } = req.body;

    // Validate required fields
    if (!imageUrl || !publicId || !filename) {
      return res.status(400).json({
        message: "Image URL, public ID, and filename are required.",
      });
    }

    // Create photo
    const photo = await Photo.create({
      user: req.user.userId,
      imageUrl,
      publicId,
      filename,
      title: title || "",
      description: description || "",
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json({
      message: "Photo created successfully.",
      photo,
    });
  } catch (error) {
    console.error("Create Photo Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ========================================
// Get Current User Photos
// ========================================
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({
      user: req.user.userId,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      photos,
    });
  } catch (error) {
    console.error("Get Photos Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

