function BulkActions({
  selectedPhotos,
  onDelete,
  onFavorite,
  onUnfavorite,
}) {
  if (selectedPhotos.length === 0)
    return null;

  return (
    <div className="bulk-actions">
      <span>
        {selectedPhotos.length} selected
      </span>

      <button onClick={onFavorite}>
        ⭐ Favorite
      </button>

      <button onClick={onUnfavorite}>
        ☆ Unfavorite
      </button>

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