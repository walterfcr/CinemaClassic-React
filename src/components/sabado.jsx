import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';

function Sabado() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales6"> 
            <h1>Sábado de Cine de Culto #2</h1>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h2>Sábado de Cine de Culto #2</h2>
            <div className="contenedor">
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie28/movie28.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie28`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie29/movie29.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie29`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie30/movie30.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie30`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>

    </main>
  );
}

export default Sabado;