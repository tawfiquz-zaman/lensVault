import {  useRef, useState } from "react";

function UploadModal({
  isOpen,
  onClose,
  onUpload,
}) {
  const [files, setFiles] = useState([]);
const [isDragging, setIsDragging] =
  useState(false);
const [isUploading, setIsUploading] =
  useState(false);
  const inputRef = useRef();



  if (!isOpen) return null;

  // ===========================
  // Add Files
  // ===========================
  const handleFiles = (selectedFiles) => {
    const incoming =
      Array.from(selectedFiles);

    setFiles((prev) => {
      const existingNames =
        new Set(
          prev.map(
            (item) => item.file.name
          )
        );

      const newFiles = incoming
        .filter(
          (file) =>
            !existingNames.has(file.name)
        )
        .map((file) => ({
          file,
          preview:
            URL.createObjectURL(file),
        }));

      return [...prev, ...newFiles];
    });

    inputRef.current.value = "";
  };

  // ===========================
  // Remove File
  // ===========================
  const removeFile = (index) => {
    setFiles((prev) => {
      const updated = [...prev];

      URL.revokeObjectURL(
        updated[index].preview
      );

      updated.splice(index, 1);

      return updated;
    });
  };


const handleClose = () => {
  files.forEach((item) =>
    URL.revokeObjectURL(item.preview)
  );

  setFiles([]);
  setIsDragging(false);
  setIsUploading(false);

  onClose();
};




  // ===========================
  // Upload
  // ===========================
const handleUploadClick = async () => {
  if (isUploading) return;

  setIsUploading(true);

  try {
    const selected = files.map(
      (item) => item.file
    );

    await onUpload(selected);

    handleClose();
  } catch (error) {
    console.error(
      "Upload failed:",
      error
    );

    alert(
      "Something went wrong while uploading."
    );

    setIsUploading(false);
  }
};

  // ===========================
  // Drag Events
  // ===========================
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    handleFiles(e.dataTransfer.files);
  };

// ===========================
// Format File Size
// ===========================
const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};



  return (
    <div className="modal-overlay">
      <div className="upload-modal">
<button
  className="close-btn"
  onClick={handleClose}
  disabled={isUploading}
>
  ✕
</button>

        <h2>Upload Photos</h2>

      <p>
  {files.length} file(s) selected
</p>

<p className="upload-total-size">
  Total size:{" "}
  {formatFileSize(
    files.reduce(
      (total, item) =>
        total + item.file.size,
      0
    )
  )}
</p>

        <div
          className={`upload-dropzone ${
            isDragging
              ? "drag-active"
              : ""
          }`}
          onClick={() =>
            inputRef.current.click()
          }
          onDragOver={
            handleDragOver
          }
          onDragLeave={
            handleDragLeave
          }
          onDrop={handleDrop}
        >
          <p>
            Drag & Drop images
            here
          </p>

          <span>or</span>

          <p>
            Click to browse
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) =>
              handleFiles(
                e.target.files
              )
            }
          />
        </div>

<div className="preview-grid">
  {files.map((item, index) => (
    <div
      className="preview-card"
      key={index}
    >
      <button
        className="preview-remove"
        onClick={() =>
          removeFile(index)
        }
      >
        ✕
      </button>

      <img
        src={item.preview}
        alt={item.file.name}
        className="preview-image"
      />

      <div className="preview-info">
        <p className="preview-name">
          {item.file.name}
        </p>

        <p className="preview-size">
          {formatFileSize(
            item.file.size
          )}
        </p>
      </div>
    </div>
  ))}
</div>

<button
  className="upload-submit-btn"
  disabled={
    files.length === 0 ||
    isUploading
  }
  onClick={handleUploadClick}
>
  {isUploading
    ? "Uploading..."
    : "Upload"}
</button>
      </div>
    </div>
  );
}

export default UploadModal;