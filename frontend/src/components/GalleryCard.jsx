import { Link } from "react-router-dom";

function GalleryCard({ photo }) {
  return (
    <Link
      to={`/dashboard/photo/${photo.id}`}
      className="gallery-card-link"
    >
      <div className="gallery-card">
        <img
          src={photo.image}
          alt={photo.title}
        />

        <div className="gallery-card-content">
          <span className="category-badge">
            {photo.category}
          </span>

          <h3>{photo.title}</h3>

          <div className="gallery-card-meta">
            <span>❤️ {photo.likes}</span>
            <span>💬 {photo.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GalleryCard;