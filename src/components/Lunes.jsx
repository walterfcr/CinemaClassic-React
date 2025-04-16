import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Lunes() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales1"> 
            <h1>Lunes de Cine Latino</h1>
            <p>El lunes está dedicado al cine latino, donde podrás disfrutar de una selección especial de películas que reflejan la rica diversidad cultural y artística de América Latina. Desde clásicos hasta estrenos modernos, el cine latino ofrece una mirada única a las historias y tradiciones de esta región, destacando su talento y creatividad.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie13/movie13.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie13`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie14/movie14.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie14`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie15/movie15.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie15`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
          <Proximamente />
    </main>
  );
}

export default Lunes;