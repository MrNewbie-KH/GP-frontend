import SearchBar from "../SearchBar";
import style from "./Hero.module.css";
function Hero() {
  return (
    <div className={style.hero}>
      <div className={style.studyParagraph}>
        Best place to study, <span className={style.spanPart}>ZAKER</span> now
        <span className={style.spanPart}>!</span>
      </div>
      <SearchBar />
    </div>
  );
}
export default Hero;
