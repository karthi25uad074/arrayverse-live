import "./Home.css";

import Navbar from "../../shared/Navbar/Navbar";
import Hero from "./components/Hero";
import ArrayCore from "./components/ArrayCore";
import WorldPreview from "./components/WorldPreview";
import Footer from "../../shared/Footer/Footer";

function Home() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const goToLearn = () => {
    window.location.href = `${basePath}/learn`;
  };

  return (
    <div className="home-page">
      <Navbar />

      <Hero />

      <ArrayCore />

      <WorldPreview />

      <section className="home-cta">
        <div className="cta-content">
          <span>ARRAYVERSE // READY</span>

          <h2>
            YOUR ARRAY
            <strong> JOURNEY STARTS HERE.</strong>
          </h2>

          <p>
            Learn. Practice. Experiment. Master.
            <br />
            No login. No limits. Completely free.
          </p>

          <button
            className="cta-button"
            type="button"
            onClick={goToLearn}
          >
            START LEARNING →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;