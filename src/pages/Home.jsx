import "./Home.css";
import FeaturedCourses from "./../components/Home/FeaturedCourses";
import Footer from "./../components/Home/Footer";
import Header from "./../components/Home/Header";
import Hero from "./../components/Home/Hero.";
import Categories from "./../components/Home/Categories";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Hero />
      <Categories />
      <FeaturedCourses />
      <Footer />
    </div>
  );
}

export default Home;
