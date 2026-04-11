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
        <section className="semanal-banner" style={{ backgroundImage: "url('/images/banner-semanales1.webp')" }}>
            <h1>Lunes de Cine Latino</h1>
            <p>El lunes está dedicado al cine latino, donde podrás disfrutar de una selección especial de películas que reflejan la rica diversidad cultural y artística de América Latina. Desde clásicos hasta estrenos modernos, el cine latino ofrece una mirada única a las historias y tradiciones de esta región, destacando su talento y creatividad.</p>
        </section>

        <div data-aos="zoom-in" id="semanales">
           <div className="contenedorSemnanal">
                       <div className="movie-card">
                         <img src="/images/movie13/movie13.webp" alt="Movie 34" />
           
                         <div className="movie-overlay">
                           <h3>Machuca</h3>
           
                           <div className="movie-actions">
                             <Link to={`/movie/movie13`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                             <Link to={`/buy/movie13`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                           </div>
                         </div>
                       </div>
                                   <div className="movie-card">
                         <img src="/images/movie14/movie14.webp" alt="Movie 34" />
           
                         <div className="movie-overlay">
                           <h3>Nueve Reinas</h3>
           
                           <div className="movie-actions">
                             <Link to={`/movie/movie14`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                             <Link to={`/buy/movie14`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                           </div>
                         </div>
                       </div>
                                   <div className="movie-card">
                         <img src="/images/movie15/movie15.webp" alt="Movie 34" />
           
                         <div className="movie-overlay">
                           <h3>Rudi & Cursi</h3>
           
                           <div className="movie-actions">
                             <Link to={`/movie/movie15`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                             <Link to={`/buy/movie15`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                           </div>
                         </div>
                       </div>
                     </div>
          </div>
          <Proximamente />
    </main>
  );
}

export default Lunes;