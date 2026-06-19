import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PhotoGrid from "../components/PhotoGrid";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <PhotoGrid />
    </>
  );
}

export default Home;