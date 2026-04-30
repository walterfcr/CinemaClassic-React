import React, { useState } from 'react';
import Testimonials from '../components/Testimonials';
import './Nosotros.css';

const cinemas = {
  1: {
    name: 'San José',
    image: '/images/combo/1.webp',
    text: 'Barrio La California'
  },
  2: {
    name: 'Heredia',
    image: '/images/combo/2.webp',
    text: 'Mall Oxígeno, San Francisco de Heredia'
  },
  3: {
    name: 'Cartago',
    image: '/images/combo/3.webp',
    text: 'Mall Paseo Metrópoli'
  }
};

function Nosotros() {
  const [selectedCinema, setSelectedCinema] = useState('1');

  const currentCinema = cinemas[selectedCinema];

  return (
    <main className="about-page">
      <h1>Acerca de Cinema Classic</h1>

      <div className="about-layout">

        {/* LEFT SIDE */}
        <div className="about-left">

          <section className="about-block">
            <h2>🎬 Una experiencia diferente</h2>
            <p>
              Cinema Classic es más que ver películas. Es vivir el cine como debe ser:
              en pantalla grande, con una programación única que mezcla estrenos,
              clásicos y cine de culto.
            </p>
          </section>

          <section className="about-block">
            <h2>💡 Tecnología digital</h2>
            <p>
              Todas nuestras salas cuentan con proyección 100% digital,
              sonido envolvente y butacas cómodas para que disfrutes
              cada función al máximo.
            </p>
          </section>

          <section className="about-block">
            <h2>📍 Nuestros cines</h2>
            <p>Selecciona una ubicación:</p>

            <select
              className="customSelect"
              onChange={(e) => setSelectedCinema(e.target.value)}
              value={selectedCinema || ''}
            >
              <option value="" disabled>Seleccione un cine</option>
              <option value="1">San José</option>
              <option value="2">Heredia</option>
              <option value="3">Cartago</option>
            </select>

            {currentCinema && (
              <p className="cine-location">{currentCinema.text}</p>
            )}
          </section>

        </div>

        {/* RIGHT SIDE */}
        <div className="about-right">
          {currentCinema ? (
            <img src={currentCinema.image} alt={currentCinema.name} />
          ) : (
            <div className="about-placeholder">
              <img src="/images/logo-cines.webp" alt="Cinema Classic" />
            </div>
          )}
        </div>

      </div>

      <Testimonials />
    </main>
  );
}

export default Nosotros;