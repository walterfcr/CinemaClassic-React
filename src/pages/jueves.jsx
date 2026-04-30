import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from '../components/Proximamente';

function Jueves() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales4.webp')" }}>
            <h1>Jueves de Cine Animado</h1>
            <p>El jueves está dedicado al cine animado, un día para disfrutar de la magia y creatividad que solo la animación puede ofrecer. El cine animado no solo es para niños, sino que ofrece historias profundas y visualmente impresionantes para todas las edades. Es una celebración de la imaginación sin límites, donde los personajes cobran vida y las historias se desarrollan de formas únicas y cautivadoras.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
             <div className="contenedorSemnanal">
                        <div className="movie-card">
                          <img src="/images/movie22/movie22.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Persepolis</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie22`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie22`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie23/movie23.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Mary and Max</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie23`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie23`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie24/movie24.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Le Magasin des Suicides</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie24`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie24`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
    <Proximamente />
    </main>
  );
}

export default Jueves;