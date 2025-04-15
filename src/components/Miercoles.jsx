import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Miercoles() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanales3"> 
            <p>El miércoles está dedicado al cine asiático, un día para adentrarse en las fascinantes historias y estilos visuales que han hecho al cine de Asia reconocido mundialmente. Desde los vibrantes y coloridos filmes de Bollywood hasta los sofisticados dramas japoneses y las impactantes narrativas de Corea del Sur, el cine asiático ofrece una rica variedad de géneros y perspectivas.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h1>Miércoles de Cine Asiático</h1>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie19/movie19.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie19`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie20/movie20.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie20`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie21/movie21.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie21`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
    <Proximamente />
    </main>
  );
}

export default Miercoles;