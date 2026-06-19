import PhotoCard from "./PhotoCard";

const photos = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Nature",
    title: "Mountain Sunrise",
    location: "Swiss Alps",
    date: "June 2026",
    likes: 124,
    comments: 18,
    user: "AB",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785",
    category: "Travel",
    title: "City Lights",
    location: "Tokyo",
    date: "May 2026",
    likes: 98,
    comments: 11,
    user: "JD",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
    category: "Wildlife",
    title: "Forest Explorer",
    location: "Canada",
    date: "April 2026",
    likes: 156,
    comments: 25,
    user: "MK",
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    category: "Landscape",
    title: "Golden Desert",
    location: "Sahara",
    date: "March 2026",
    likes: 76,
    comments: 8,
    user: "RS",
  },
];

function PhotoGrid() {
  return (
    <section className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          image={photo.image}
          category={photo.category}
          title={photo.title}
          location={photo.location}
          date={photo.date}
          likes={photo.likes}
          comments={photo.comments}
          user={photo.user}
        />
      ))}
    </section>
  );
}

export default PhotoGrid;