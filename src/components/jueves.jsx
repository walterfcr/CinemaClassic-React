import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Jueves() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales4"> 
            <h1>Jueves de Cine Animado</h1>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h2>Jueves de Cine Animado</h2>
            <div className="contenedor">
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie22/movie22.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie22`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie23/movie23.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie23`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie24/movie24.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie24`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
    <Proximamente />
    </main>
  );
}

export default Jueves;