import React from 'react';
import Combos from '../components/Combos';
import './Dulceria.css';

function Dulceria() {
  return (
    <main className="dulceria-page">
      <h1>Dulcería Cinema Classic</h1>

      <div className="dulceria-layout">

        {/* LEFT - TEXT */}
        <div className="dulceria-left">
          <section className="dulceria-block">
            <h2>🍿 Una experiencia completa</h2>
            <p>
              Disfruta de una amplia variedad de golosinas, chocolates,
              refrescos y nuestras infaltables palomitas de maíz.
            </p>
          </section>

          <section className="dulceria-block">
            <h2>🔥 Sabores únicos</h2>
            <p>
              Desde las clásicas hasta opciones como caramelo, Cheetos,
              Doritos y Takis para los más atrevidos.
            </p>
          </section>

          <section className="dulceria-block">
            <h2>🎟️ Beneficios VIP</h2>
            <p>
              Muestra tu entrada VIP y obtén un combo gratis.
              Aprovecha nuestras promociones exclusivas.
            </p>
          </section>

          <p className="dulceria-note">
            *No se admite el ingreso de alimentos externos.
          </p>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="dulceria-right">
          <img src="/images/dulceria.webp" alt="Dulcería Cinema Classic" />
        </div>

      </div>

      <Combos />
    </main>
  );
}

export default Dulceria;