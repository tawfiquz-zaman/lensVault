import GalleryCard from "./GalleryCard";

function GalleryGrid({ photos }) {
  return (
    <div className="gallery-grid">
      {photos.map((photo) => (
        <GalleryCard
          key={photo.id}
          photo={photo}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;