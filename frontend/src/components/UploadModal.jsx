import { useRef, useState } from "react";

function UploadModal({ isOpen, onClose, onUpload }) {
  const [files, setFiles] = useState([]);

  const inputRef = useRef();

  if (!isOpen) return null;

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    const previewFiles = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...previewFiles]);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];

    URL.revokeObjectURL(updatedFiles[index].preview);

    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

 const handleUploadClick = async () => {
  const selectedFiles = files.map((item) => item.file);

  await onUpload(selectedFiles);

  setFiles([]);
  onClose();
};
  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Upload Photos</h2>

        <p>{files.length} file(s) selected</p>

        <div
          className="upload-dropzone"
          onClick={() => inputRef.current.click()}
        >
          <p>Click to choose images</p>

          <input
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="preview-list">
          {files.map((item, index) => (
            <div className="preview-item" key={index}>
              <img
                src={item.preview}
                alt="preview"
                className="preview-image"
              />

              <p>{item.file.name}</p>

              <button
                className="remove-btn"
                onClick={() => removeFile(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          className="upload-submit-btn"
          onClick={handleUploadClick}
          disabled={files.length === 0}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadModal;