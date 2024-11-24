// src/components/Carousel.js
import React, { useState } from 'react';
import './Carousel.css';

const slides = [
  {
    title: "Welcome to MediLab",
    description: "The best solution for managing medical labs and pharmacies.",
  },
  {
    title: "Manage Appointments Easily",
    description: "Track and manage all your appointments efficiently.",
  },
  {
    title: "Patient Feedback",
    description: "Easily manage and review patient feedback in real time.",
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  React.useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === activeIndex ? "active" : ""}`}
        >
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <button className="btn-primary" onClick={() => window.location.href = "/admin-dashboard"}>Get Started</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
