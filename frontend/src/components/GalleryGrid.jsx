import GalleryCard from "./GalleryCard";

function GalleryGrid({
  photos,
  selectedPhotos,
  onSelectPhoto,
}) {
  return (
    <div className="gallery-grid">
      {photos.map((photo) => (
        <GalleryCard
          key={photo.id}
          photo={photo}
          selectedPhotos={selectedPhotos}
          onSelectPhoto={onSelectPhoto}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;