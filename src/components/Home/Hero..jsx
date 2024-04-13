// Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Learn Anything, Anywhere</h1>
        <p>Explore thousands of courses for every skill level</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for courses" />
          <button className="btn btn-secondary">Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
