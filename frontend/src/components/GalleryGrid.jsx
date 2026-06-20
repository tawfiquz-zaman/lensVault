import GalleryCard from "./GalleryCard";

function GalleryGrid({ photos }) {
  return (
    <div className="gallery-grid">
      {photos.map((photo) => (
        <GalleryCard
          key={photo.id}
          image={photo.image}
          title={photo.category}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;