import cloudinary from "../config/cloudinary.js";
import Photo from "../models/Photo.js";

// ========================================
// Upload Photo to Cloudinary + MongoDB
// ========================================
export const uploadPhoto = async (req, res) => {
  try {
    // Make sure a file was received
    if (!req.file) {
      return res.status(400).json({
        message: "No image file uploaded.",
      });
    }

    // Upload image buffer to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "lensvault",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    // Create photo record in MongoDB
    const photo = await Photo.create({
      user: req.user.userId,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      filename: req.file.originalname,
      title: req.body.title || "",
      description: req.body.description || "",

      // Accept both JSON array and comma-separated tags
      tags: req.body.tags
        ? req.body.tags.startsWith("[")
          ? JSON.parse(req.body.tags)
          : req.body.tags.split(",").map((tag) => tag.trim())
        : [],
    });

    res.status(201).json({
      message: "Photo uploaded successfully.",
      photo,
    });
  } catch (error) {
    console.error("Upload Photo Error:", error);

    res.status(500).json({
      message: "Photo upload failed.",
    });
  }
};

