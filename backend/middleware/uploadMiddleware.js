import multer from "multer";

// Store uploaded files temporarily in memory.
// The file will then be sent directly to Cloudinary.
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

export default upload;
