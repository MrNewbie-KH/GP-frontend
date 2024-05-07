// Hero.js
import React from "react";
import Search from "./../Search/Search";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Learn Anything, Anywhere</h1>
        <p>Explore thousands of courses for every skill level</p>
        <Search />
      </div>
    </section>
  );
};

export default Hero;
