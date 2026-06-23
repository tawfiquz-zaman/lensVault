function BulkActions({
  selectedPhotos,
  selectedPhotoObjects,
  onDelete,
  onFavorite,
  onUnfavorite,
}) {
  // Hide panel when nothing selected
  if (selectedPhotos.length === 0)
    return null;

  // Download all selected photos
  const handleDownload = () => {
    selectedPhotoObjects.forEach(
      (photo, index) => {
        setTimeout(() => {
          const link =
            document.createElement("a");

          link.href = photo.image;
          link.download =
            photo.title ||
            `photo-${index + 1}`;

          document.body.appendChild(
            link
          );

          link.click();

          document.body.removeChild(
            link
          );
        }, index * 300);
      }
    );
  };

  return (
    <div className="bulk-actions">
      {/* Selected Count */}
      <span>
        {selectedPhotos.length} selected
      </span>

      {/* Favorite */}
      <button onClick={onFavorite}>
        ⭐ Favorite
      </button>

      {/* Unfavorite */}
      <button onClick={onUnfavorite}>
        ☆ Unfavorite
      </button>

      {/* Download */}
      <button
        className="bulk-download"
        onClick={handleDownload}
      >
        ⬇ Download
      </button>

      {/* Delete */}
      <button
        className="bulk-delete"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default BulkActions;