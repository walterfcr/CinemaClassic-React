// Slider.jsx
import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/banner0.webp',
    '/images/banner1.webp',
    '/images/banner2.webp',
    '/images/banner3.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;


