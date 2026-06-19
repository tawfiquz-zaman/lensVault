import GalleryCard from "./GalleryCard";

const gallery = [
  {
    id: 1,
    title: "Mountain",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 2,
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785",
  },
  {
    id: 3,
    title: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  },
  {
    id: 4,
    title: "Landscape",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

function GalleryGrid() {
  return (
    <div className="gallery-grid">
      {gallery.map((item) => (
        <GalleryCard
          key={item.id}
          image={item.image}
          title={item.title}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;