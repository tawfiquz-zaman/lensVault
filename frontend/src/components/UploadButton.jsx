function UploadButton({ onClick }) {
  return (
    <button
      className="upload-btn"
      onClick={onClick}
    >
      + Upload Photos
    </button>
  );
}

export default UploadButton;