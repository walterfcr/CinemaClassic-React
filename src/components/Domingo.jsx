import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useLocation } from 'react-router-dom';
import Proximamente from './Proximamente';

function Domingo() {

    //const navigate = useNavigate();
    const location = useLocation();

      useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
  return (
    <main>
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales7.webp')" }}>
            <h1>Director del mes - Quentin Tarantino</h1>
            <p>Los domingos celebramos al Director del Mes, una oportunidad para adentrarse en la visión y estilo de grandes cineastas que han dejado su marca en la historia del cine.<br /><br /> Cada mes se selecciona un director diferente, y se proyecta una cuidada selección de sus obras más representativas, permitiendo apreciar su evolución, su lenguaje cinematográfico y los temas que definen su filmografía. Es una cita imperdible para quienes desean entender el cine desde la mirada de sus creadores más influyentes.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedorSemnanal">
                        <div className="movie-card">
                          <img src="/images/movie31/movie31.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Pulp Fiction</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie31`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie31`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie32/movie32.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Inglourious Basterds</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie32`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie32`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                                    <div className="movie-card">
                          <img src="/images/movie33/movie33.webp" alt="Movie 34" />
            
                          <div className="movie-overlay">
                            <h3>Django Unchained</h3>
            
                            <div className="movie-actions">
                              <Link to={`/movie/movie33`} state={{ backgroundLocation: location }} className="btnSecondary">Detalles</Link>
                              <Link to={`/buy/movie33`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
    <Proximamente />
    </main>
  );
}

export default Domingo;