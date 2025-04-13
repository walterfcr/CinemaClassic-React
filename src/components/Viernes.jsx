import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';

function Viernes() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales5"> 
            <h1>Viernes de Cine de Culto #1</h1>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h2>Viernes de Cine de Culto #1</h2>
            <div className="contenedor">
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie25/movie25.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie25`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie26/movie26.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie26`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno" data-aos="flip-left">
                <img src="images/movie27/movie27.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie27`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>

    </main>
  );
}

export default Viernes;