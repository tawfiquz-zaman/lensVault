function GalleryCard({ image, title }) {
  return (
    <div className="gallery-card">
      <img src={image} alt={title} />

      <div className="gallery-overlay">
        <h4>{title}</h4>
      </div>
    </div>
  );
}

export default GalleryCard;