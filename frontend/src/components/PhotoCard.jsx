function PhotoCard({
  image,
  category,
  title,
  location,
  date,
  likes,
  comments,
  user,
}) {
  return (
    <div className="photo-card">
      <div className="photo-image-wrapper">
        <img
          src={image}
          alt={title}
          className="photo-image"
        />

        <span className="photo-badge">
          {category}
        </span>
      </div>

      <div className="photo-content">
        <h3>{title}</h3>

        <p className="location">
          📍 {location}
        </p>

        <p className="date">
          📅 {date}
        </p>

        <div className="photo-footer">
          <div className="avatar">
            {user}
          </div>

          <div className="stats">
            ❤️ {likes}
          </div>

          <div className="stats">
            💬 {comments}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;