import React from "react";

const Hero = () => {
  const heroStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.6) 100%), url(${process.env.PUBLIC_URL}/images/airline-2.jpg)`,
  };

  return (
    <section id="home" className="hero" style={heroStyle}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h2>Professional Flight Solutions</h2>
        <p>
          Trusted by businesses worldwide for reliable, efficient flight booking
          services. Advanced technology, competitive rates, and 24/7 support.
        </p>

        <div className="hero-cta">
          <a href="#search" className="hero-btn">
            Book Now
          </a>
          <a href="#about" className="hero-btn secondary">
            Learn More
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Destinations</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
