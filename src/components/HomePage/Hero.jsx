import SearchBar from "../SearchBar";
function Hero() {
  return (
    <div className="hero">
      <div className="studyParagraph">
        Best place to study, <span className="spanPart">ZAKER</span> now
        <span className="spanPart">!</span>
      </div>
      <SearchBar />
    </div>
  );
}
export default Hero;
