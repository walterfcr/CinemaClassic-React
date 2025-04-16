import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Martes() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales2"> 
           <h1>Martes de Cine Europeo</h1>
            <p>El martes está dedicado al cine europeo, un espacio para explorar las innovadoras propuestas y narrativas que definen la cinematografía del viejo continente. Desde las emotivas obras francesas hasta los intensos dramas del cine nórdico, el cine europeo destaca por su estilo único y su capacidad para abordar temas profundos y universales.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie16/movie16.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie16`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie17/movie17.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie17`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie18/movie18.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie18`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
          <Proximamente />
    </main>
  );
}

export default Martes;