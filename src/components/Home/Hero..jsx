// Hero.js
import React from "react";
import Search from "./../Search/Search";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Learn Anything, Anywhere</h1>
        <p>We make it easy to learn everything everywhere...</p>
        <Search />
      </div>
    </section>
  );
};

export default Hero;
