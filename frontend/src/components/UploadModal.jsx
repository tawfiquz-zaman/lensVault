function UploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <h2>Upload Photos</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="drop-zone">
          <p>Drag & Drop Photos Here</p>

          <button className="browse-btn">
            Browse Files
          </button>
        </div>

        <div className="preview-list">
          <h3>Selected Files</h3>

          <ul>
            <li>mountain.jpg</li>
            <li>forest.png</li>
            <li>river.jpeg</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;