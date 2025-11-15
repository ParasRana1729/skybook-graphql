import React from "react";

const About = () => {
  const features = [
    {
      id: 1,
      icon: "takeoff-icon.svg",
      title: "Global Coverage",
      description: "Connect to 500+ destinations worldwide",
    },
    {
      id: 2,
      icon: "target-icon.svg",
      title: "Best Prices",
      description: "Competitive rates guaranteed",
    },
    {
      id: 3,
      icon: "shield-icon.svg",
      title: "Secure Booking",
      description: "Safe and secure transactions",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h3>About SkyBook</h3>
        <div className="about-content">
          <div className="about-text">
            <p>
              SkyBook is your trusted partner for flight booking. We provide
              easy-to-use search functionality and competitive prices for
              flights worldwide.
            </p>

            <div className="features">
              {features.map((feature) => (
                <div key={feature.id} className="feature">
                  <div className="feature-icon">
                    <img
                      src={`/images/${feature.icon}`}
                      alt={feature.title}
                      className="feature-img"
                    />
                  </div>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image">
            <img
              src="/images/airline-1.jpg"
              alt="Modern commercial airline aircraft"
              className="main-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
