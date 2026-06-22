import { usePhotos } from "../context/PhotoContext";

function StorageCard() {
  const { photos } = usePhotos();

  const totalPhotos = photos.length;

  const totalLikes = photos.reduce(
    (sum, photo) =>
      sum + (photo.likes || 0),
    0
  );

  const totalComments = photos.reduce(
    (sum, photo) =>
      sum + (photo.comments || 0),
    0
  );

  const totalFavorites = photos.filter(
    (photo) => photo.favorite
  ).length;

  return (
    <div className="storage-card">
      <h3>Storage Usage</h3>

      <p>2.4 GB / 15 GB Used</p>

      <div className="storage-bar">
        <div className="storage-fill"></div>
      </div>

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
    </div>
  );
}

export default StorageCard;