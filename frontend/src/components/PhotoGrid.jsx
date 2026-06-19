function PhotoGrid() {
  return (
    <section className="photo-grid">

      <div className="photo-card">
        <div className="photo-image orange"></div>

        <div className="photo-content">
          <h3>Golden Hour Ridge</h3>
          <p>Shimla, India</p>
        </div>
      </div>

      <div className="photo-card">
        <div className="photo-image red"></div>

        <div className="photo-content">
          <h3>Ramen Bowl Detail</h3>
          <p>Tokyo, Japan</p>
        </div>
      </div>

      <div className="photo-card">
        <div className="photo-image purple"></div>

        <div className="photo-content">
          <h3>Abstract Geometry</h3>
          <p>Bengaluru, India</p>
        </div>
      </div>

    </section>
  );
}

export default PhotoGrid;