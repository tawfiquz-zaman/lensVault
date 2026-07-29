import { usePhotos } from "../context/PhotoContext";

function AlbumSidebar() {
  const {
    albums,
    createAlbum,
    renameAlbum,
    deleteAlbum,
  } = usePhotos();

  const handleCreateAlbum = () => {
    const albumName = prompt("Enter album name:");

    if (albumName === null) return;

    createAlbum(albumName);
  };

  return (
    <div className="album-sidebar">
      <div className="album-header">
        <h2>Albums</h2>

        <button
          className="album-create-btn"
          onClick={handleCreateAlbum}
        >
          + Create Album
        </button>
      </div>

      {albums.length === 0 ? (
        <p>No albums yet.</p>
      ) : (
        albums.map((album) => (
          <div
            key={album.id}
            className="album-card"
          >
            <h3>{album.name}</h3>

            <p>
              {album.photoIds.length} Photos
            </p>

            <div className="album-actions">
              <button
                className="album-rename-btn"
                onClick={() => {
                  const newName = prompt(
                    "Rename Album",
                    album.name
                  );

                  if (newName !== null) {
                    renameAlbum(
                      album.id,
                      newName
                    );
                  }
                }}
              >
                Rename
              </button>

              <button
                className="album-delete-btn"
                onClick={() =>
                  deleteAlbum(album.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AlbumSidebar;