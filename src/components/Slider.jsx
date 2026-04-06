import React, { useState, useEffect } from 'react';
import './Slider.css';
import HeroBookingModal from './HeroBookingModal'; // 👈 import modal

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
  const [prevIndex, setPrevIndex] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showModal, setShowModal] = useState(false); // 👈 NEW

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFirstLoad(false);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider-container">

      {/* Previous image */}
      {prevIndex !== null && !isFirstLoad && (
        <div
          className="slider fade-out"
          style={{ backgroundImage: `url(${images[prevIndex]})` }}
        >
          <div className="slider-overlay" />
        </div>
      )}

      {/* Current image */}
      <div
        className={`slider ${isFirstLoad ? '' : 'fade-in'}`}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="slider-overlay" />

        {/* Text */}
        <div
          key={currentIndex}
          className={`slider-text ${isFirstLoad ? '' : 'text-animate'}`}
        >
          <h2 className="title">{texts[currentIndex].title}</h2>
          <p className="subtitle">{texts[currentIndex].subtitle}</p>

          {/* 🎯 HERO CTA BUTTON */}
          <button
            className="hero-cta btnWarning"
            onClick={() => setShowModal(true)}
          >
            Encuentra tu función
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setPrevIndex(currentIndex);
              setCurrentIndex(index);
              setIsFirstLoad(false);
            }}
          ></span>
        ))}
      </div>

      {/* 🎬 MODAL */}
      {showModal && (
        <HeroBookingModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Slider;