import mongoose from "mongoose";

const photoSchema = new mongoose.Schema(
  {
    // ========================================
    // Photo Owner
    // ========================================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ========================================
    // Cloudinary Information
    // ========================================
    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    // ========================================
    // Photo Information
    // ========================================
    filename: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // ========================================
    // Tags
    // ========================================
    tags: {
      type: [String],
      default: [],
    },

    // ========================================
    // Photo Status
    // ========================================
    isFavorite: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    // ========================================
    // Album
    // ========================================
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;

