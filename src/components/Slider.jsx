import React, { useState, useEffect } from 'react';
import './Slider.css';

// 👇 Sección fuera del componente
const images = [
  '/images/banner0.jpg',
  '/images/banner1.jpg',
  '/images/banner3.webp',
  '/images/banner2.jpg'
];

const texts = [
  { title: 'Cinema Classic', subtitle: 'Cinema Classic es la nueva forma de disfrutar del cine, un lugar donde puedes disfrutar de lo más reciente hasta lo clásico! ' },
  { title: 'Estrenos', subtitle: 'Sumérgete en los estrenos más impactantes, desde superproducciones hasta joyas del cine independiente. ¡Cada película, una experiencia inolvidable! ' },
  { title: 'Clásicos', subtitle: 'Cada semana proyectamos una temática diferente para que puedas disfrutar de clásicos que no hayas visto como debe de ser, en la pantalla grande!!' },
  { title: 'Visítanos', subtitle: 'Estamos ubicados en San José, Cartago y Heredia. ' }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); // ✅ Sin advertencias

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="slider-overlay" />
        <div className="slider-text">
          <h2>{texts[currentIndex].title}</h2>
          <p>{texts[currentIndex].subtitle}</p>
        </div>
      </div>
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
