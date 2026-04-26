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
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales2.webp')" }}>
           <h1>Martes de Cine Europeo</h1>
            <p>El martes está dedicado al cine europeo, un espacio para explorar las innovadoras propuestas y narrativas que definen la cinematografía del viejo continente. Desde las emotivas obras francesas hasta los intensos dramas del cine nórdico, el cine europeo destaca por su estilo único y su capacidad para abordar temas profundos y universales.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedorSemnanal">
                        <div className="movie-card">
                          <img src="/images/movie16/movie16.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>13 Tzameti</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie16`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie16`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie17/movie17.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Kynódontas </h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie17`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie17`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie18/movie18.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>La Vita è Bella</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie18`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie18`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
          <Proximamente />
    </main>
  );
}

export default Martes;