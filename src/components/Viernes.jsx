import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Viernes() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales5.webp')" }}>
            <h1>Viernes de Cine de Culto #1</h1>
            <p>Los viernes y sábados están reservados para el cine de culto, una experiencia pensada para los verdaderos apasionados del séptimo arte. Aquí se proyectan aquellas películas que, a pesar del paso del tiempo, han mantenido un seguimiento fiel y han dejado huella en la historia del cine por su estilo único, sus temáticas transgresoras o su narrativa innovadora. Desde clásicos underground hasta joyas incomprendidas en su momento, este espacio invita a redescubrir obras que han marcado generaciones y siguen inspirando a cinéfilos de todo el mundo.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedorSemnanal">
                        <div className="movie-card">
                          <img src="/images/movie25/movie25.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Heat</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie25`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie25`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie26/movie26.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Trainspotting</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie26`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie26`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie27/movie27.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Pi: Faith in Chaos</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie27`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie27`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
      <Proximamente />
    </main>
  );
}

export default Viernes;