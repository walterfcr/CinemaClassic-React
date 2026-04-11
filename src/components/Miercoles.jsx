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
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales3.webp')" }}>
            <h1>Miércoles de Cine Asiático</h1>
            <p>El miércoles está dedicado al cine asiático, un día para adentrarse en las fascinantes historias y estilos visuales que han hecho al cine de Asia reconocido mundialmente. Desde los vibrantes y coloridos filmes de Bollywood hasta los sofisticados dramas japoneses y las impactantes narrativas de Corea del Sur, el cine asiático ofrece una rica variedad de géneros y perspectivas.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
            <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie19/movie19.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Parasite</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie19`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie19`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie20/movie20.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Bar Bahar</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie20`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie20`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie21/movie21.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Oldboy</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie21`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie21`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
    <Proximamente />
    </main>
  );
}

export default Miercoles;