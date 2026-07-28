import { usePhotos } from "../context/PhotoContext";

function StorageCard() {
  const { photos } = usePhotos();

  const totalPhotos = photos.length;

  const totalFavorites = photos.filter(
    (photo) => photo.favorite
  ).length;

  const totalLikes = photos.reduce(
    (sum, photo) =>
      sum + (photo.likes || 0),
    0
  );

  const totalComments = photos.reduce(
    (sum, photo) =>
      sum +
      (photo.commentsList
        ? photo.commentsList.length
        : photo.comments || 0),
    0
  );

  const today = new Date();

  const photosToday = photos.filter((photo) => {
    if (!photo.uploadDate) return false;

    const date = new Date(photo.uploadDate);

    return (
      date.getFullYear() ===
        today.getFullYear() &&
      date.getMonth() ===
        today.getMonth() &&
      date.getDate() ===
        today.getDate()
    );
  }).length;

  const mostLikedPhoto =
    photos.length > 0
      ? photos.reduce((max, photo) =>
          (photo.likes || 0) >
          (max.likes || 0)
            ? photo
            : max
        )
      : null;

  const mostCommentedPhoto =
    photos.length > 0
      ? photos.reduce((max, photo) => {
          const current =
            photo.commentsList
              ? photo.commentsList.length
              : photo.comments || 0;

          const highest =
            max.commentsList
              ? max.commentsList.length
              : max.comments || 0;

          return current > highest
            ? photo
            : max;
        })
      : null;

  return (
    <div className="storage-card">
      <h3>Storage Usage</h3>

      <p>2.4 GB / 15 GB Used</p>

      {/* Storage progress bar */}
      <div className="storage-bar">
        <div className="storage-fill"></div>
      </div>

      {/* Main statistics */}
      <div className="stats-section">
        <div className="stat-item">
          <span>Total Photos</span>
          <strong>{totalPhotos}</strong>
        </div>

        <div className="stat-item">
          <span>Total Likes</span>
          <strong>{totalLikes}</strong>
        </div>

        <div className="stat-item">
          <span>Total Comments</span>
          <strong>{totalComments}</strong>
        </div>

        <div className="stat-item">
          <span>⭐ Total Favorites</span>
          <strong>{totalFavorites}</strong>
        </div>

        <div className="stat-item">
          <span>📅 Uploaded Today</span>
          <strong>{photosToday}</strong>
        </div>
      </div>

      {/* Analytics section */}
      <div className="analytics-section">
        <h4>Gallery Analytics</h4>

        <div className="analytics-item">
          <span>🏆 Most Liked</span>

          <strong>
            {mostLikedPhoto
              ? `${mostLikedPhoto.title} (${mostLikedPhoto.likes || 0})`
              : "No photos"}
          </strong>
        </div>

        <div className="analytics-item">
          <span>💬 Most Commented</span>

          <strong>
            {mostCommentedPhoto
              ? `${mostCommentedPhoto.title} (${
                  mostCommentedPhoto.commentsList
                    ? mostCommentedPhoto.commentsList.length
                    : mostCommentedPhoto.comments || 0
                })`
              : "No photos"}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default StorageCard;