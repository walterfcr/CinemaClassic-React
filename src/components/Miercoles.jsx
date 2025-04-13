import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';

function Miercoles() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales3"> 
            <h1>Miércoles de Cine Asiático</h1>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h2>Miércoles de Cine Asiático</h2>
            <div className="contenedor">
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie19/movie19.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie19`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie20/movie20.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie20`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie21/movie21.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie21`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>

    </main>
  );
}

export default Miercoles;