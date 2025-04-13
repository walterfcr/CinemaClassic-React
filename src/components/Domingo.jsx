import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';

function Domingo() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales7"> 
            <h1>Domingo - Director del mes</h1>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h2>Domingo - Director del mes</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie31/movie31.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie31`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie32/movie32.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie32`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie33/movie33.webp" alt="Sunday Movie 2" />
              <Link to={`/movie/movie33`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>

    </main>
  );
}

export default Domingo;