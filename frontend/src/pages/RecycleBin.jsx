import { usePhotos } from "../context/PhotoContext";
import DashboardNavbar from "../components/DashboardNavbar";

function RecycleBin() {
  const {
    photos,
    restorePhoto,
    deleteForever,
  } = usePhotos();

  // Show only deleted photos
  const deletedPhotos = photos.filter(
    (photo) => photo.deleted
  );

  return (
    <div className="dashboard">
      <DashboardNavbar />

      <div
        style={{
          padding: "30px",
        }}
      >
        <h1>🗑 Recycle Bin</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Restore deleted photos or remove
          them permanently.
        </p>

        {deletedPhotos.length === 0 ? (
          <div className="empty-search">
            <h2>Recycle Bin is empty</h2>

            <p>
              Deleted photos will appear
              here.
            </p>
          </div>
        ) : (
          <div className="photo-grid">
            {deletedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                />

                <div
                  style={{
                    padding: "15px",
                  }}
                >
                  <h3>{photo.title}</h3>

                  <p>
                    Deleted:
                    {" "}
                    {photo.deletedAt
                      ? new Date(
                          photo.deletedAt
                        ).toLocaleString()
                      : "-"}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        restorePhoto(
                          photo.id
                        )
                      }
                    >
                      Restore
                    </button>

                    <button
                      onClick={() =>
                        deleteForever(
                          photo.id
                        )
                      }
                    >
                      Delete Forever
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecycleBin;