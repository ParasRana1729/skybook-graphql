import React from "react";

const Fleet = () => {
  const airlines = [
    {
      id: 1,
      image: "airline-1.jpg",
      title: "Premium Fleet",
      description: "Modern aircraft with latest technology",
    },
    {
      id: 2,
      image: "airline-2.jpg",
      title: "Comfort First",
      description: "Spacious seating and premium amenities",
    },
    {
      id: 3,
      image: "airline-3.jpg",
      title: "Global Reach",
      description: "International destinations worldwide",
    },
  ];

  return (
    <section id="fleet" className="fleet-section">
      <div className="container">
        <h3>Our Partner Airlines</h3>
        <p className="fleet-description">
          Fly with confidence on our premium airline partners
        </p>

        <div className="airline-gallery">
          {airlines.map((airline) => (
            <div key={airline.id} className="airline-card">
              <img
                src={`/images/${airline.image}`}
                alt={airline.title}
                className="airline-image"
              />
              <div className="airline-info">
                <h4>{airline.title}</h4>
                <p>{airline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
