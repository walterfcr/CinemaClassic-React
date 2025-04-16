import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

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
            <p>Los viernes y sábados están reservados para el cine de culto, una experiencia pensada para los verdaderos apasionados del séptimo arte. Aquí se proyectan aquellas películas que, a pesar del paso del tiempo, han mantenido un seguimiento fiel y han dejado huella en la historia del cine por su estilo único, sus temáticas transgresoras o su narrativa innovadora. Desde clásicos underground hasta joyas incomprendidas en su momento, este espacio invita a redescubrir obras que han marcado generaciones y siguen inspirando a cinéfilos de todo el mundo.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie28/movie28.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie28`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie29/movie29.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie29`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie30/movie30.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie30`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
      <Proximamente />
    </main>
  );
}

export default Sabado;