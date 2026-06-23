import { usePhotos } from "../context/PhotoContext";

function StorageCard() {
  const { photos } = usePhotos();

  // Total uploaded photos
  const totalPhotos = photos.length;

  // Total likes across all photos
  const totalLikes = photos.reduce(
    (sum, photo) =>
      sum + (photo.likes || 0),
    0
  );

  // Total comments across all photos
  const totalComments = photos.reduce(
    (sum, photo) =>
      sum + (photo.comments || 0),
    0
  );

  // Total favorite photos
  const totalFavorites = photos.filter(
    (photo) => photo.favorite
  ).length;

  // Most liked photo
  const mostLikedPhoto =
    photos.length > 0
      ? photos.reduce((max, photo) =>
          (photo.likes || 0) >
          (max.likes || 0)
            ? photo
            : max
        )
      : null;

  // Most commented photo
  const mostCommentedPhoto =
    photos.length > 0
      ? photos.reduce((max, photo) =>
          (photo.comments || 0) >
          (max.comments || 0)
            ? photo
            : max
        )
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
          <strong>
            {totalFavorites}
          </strong>
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
              ? `${mostCommentedPhoto.title} (${mostCommentedPhoto.comments || 0})`
              : "No photos"}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default StorageCard;