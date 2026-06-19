import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">
        FULL QUALITY • YOUR GOOGLE DRIVE • TOTAL PRIVACY
      </div>

      <h1>
        Your Photos,
        <br />
        <span>Your Drive.</span>
      </h1>

      <p>
        Upload, showcase & share photography at full quality.
        Every user gets their own isolated Google Drive.
      </p>

      <div className="hero-buttons">
        <Link to="/dashboard" className="start-btn">
          Start Free
        </Link>

        <button className="preview-btn">
          Preview as User →
        </button>
      </div>
    </section>
  );
}

export default Hero;