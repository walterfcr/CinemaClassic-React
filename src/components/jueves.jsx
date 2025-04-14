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
            <p>El jueves está dedicado al cine animado, un día para disfrutar de la magia y creatividad que solo la animación puede ofrecer. El cine animado no solo es para niños, sino que ofrece historias profundas y visualmente impresionantes para todas las edades. Es una celebración de la imaginación sin límites, donde los personajes cobran vida y las historias se desarrollan de formas únicas y cautivadoras.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <h1>Jueves de Cine Animado</h1>
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