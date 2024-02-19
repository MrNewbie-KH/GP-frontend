import NavBar from "../components/HomePage/NavBar";
import Hero from "../components/HomePage/Hero";
import style from "./HomePage.module.css";
function HomePage() {
  return (
    <div className={style.homePage}>
      <NavBar />
      <Hero />
    </div>
  );
}
export default HomePage;
