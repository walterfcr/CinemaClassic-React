import React, { useState, useEffect } from 'react';
import './Slider.css';
import HeroBookingModal from './HeroBookingModal';

const images = [
  '/images/banner1.webp',
  '/images/banner1.jpg',
  '/images/banner3.webp',
  '/images/banner2.webp'
];

const texts = [
  {
    title: 'Cinema Classic',
    subtitle:
      'Más que ver películas, vive el cine. Compra tus boletos, reserva tu asiento y sumérgete en una experiencia única en pantalla grande.'
  },
  {
    title: 'Estrenos',
    subtitle:
      'Los mejores estrenos, en el momento perfecto. Reserva tu entrada y asegura tu lugar para las películas que todos están esperando.'
  },
  {
    title: 'Clásicos',
    subtitle:
      'Revive grandes historias en la pantalla grande. Funciones especiales cada semana para los verdaderos amantes del cine.'
  },
  {
    title: 'Visítanos',
    subtitle:
      'Encuentra tu cine más cercano en San José, Cartago y Heredia. Tu próxima función comienza aquí.'
  }
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // ✅ Auto slide (clean, no delay issues)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % images.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Preload images (prevents initial lag)
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="slider-container">

      {/* Previous image */}
      <div
        className="slider fade-out"
        style={{ backgroundImage: `url(${images[prevIndex]})` }}
      >
        <div className="slider-overlay" />
      </div>

      {/* Current image */}
      <div
        key={currentIndex}
        className="slider fade-in"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="slider-overlay" />

        {/* Text */}
        <div key={currentIndex} className="slider-text text-animate">
          <h2 className="title">{texts[currentIndex].title}</h2>
          <p className="subtitle">{texts[currentIndex].subtitle}</p>

          <button
            className="hero-cta btnWarning"
            onClick={() => setShowModal(true)}
          >
            Encuentra tu función
          </button>
        </div>
      </div>



      {/* Modal */}
      {showModal && (
        <HeroBookingModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Slider;