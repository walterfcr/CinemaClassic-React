import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
//import './Content.css'; 
//import { useNavigate, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Vip from './Vip';
import Proximamente from './Proximamente';



function Content() {
  const [selectedDay, setSelectedDay] = useState('domingo'); // Default tab is 'domingo'
  //const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
      AOS.init({
        once: true,      // animations happen only once
        duration: 400,   // faster animation
        easing: "ease-out",
      });
    }, []);

    // 👇 Refresh AOS on route change (like Vue afterEach)
    useEffect(() => {
      AOS.refreshHard();
    }, [location.pathname]);

  return (
    
    <main>
      {/* Películas en Estreno Section */}
      <div className="contentWrap section" >
        <h1>Películas en Estreno</h1>
        <div className="contenedor">

          <div className="movie-card">
            <img src="/images/movie34/movie34.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Wicked Part 2</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie34`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie34`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie35/movie35.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Weapons</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie35`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie35`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
                    <div className="movie-card">
            <img src="/images/movie36/movie36.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Superman</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie36`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie36`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie37/movie37.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>One Battle After Another</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie37`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie37`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src="/images/movie38/movie38.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Plankton: The Movie</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie38`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie38`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie39/movie39.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Bugonia</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie39`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie39`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
                    <div className="movie-card">
            <img src="/images/movie40/movie40.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Caught Stealing</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie40`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie40`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie41/movie41.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Osiris</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie41`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie41`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>

          </div>
          <h1>Películas de 2023</h1>
          <div className="contenedor">

          <div className="movie-card">
            <img src="/images/movie1/movie1.webp" alt="Movie 01" />

            <div className="movie-overlay">
              <h3>John Wick 4</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie01`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie01`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie2/movie2.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Ant-Man and the Wasp: Quantumania</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie02`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie02`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
                    <div className="movie-card">
            <img src="/images/movie3/movie3.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Scream 4</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie03`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie03`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie4/movie4.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Everything Everywhere All at Once</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie04`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie04`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src="/images/movie5/movie5.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Demon Slayer</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie05`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie05`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie6/movie6.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>The Whale</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie06`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie06`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
                    <div className="movie-card">
            <img src="/images/movie7/movie7.webp" alt="Movie 34" />

            <div className="movie-overlay">
              <h3>Shazam! Fury of the Gods</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie07`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie07`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>
          <div className="movie-card">
            <img src="/images/movie8/movie8.webp" alt="Movie 35" />

            <div className="movie-overlay">
              <h3>Super Mario</h3>

              <div className="movie-actions">
                <Link to={`/movie/movie08`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                <Link to={`/buy/movie08`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
              </div>
            </div>
          </div>

          </div>
      </div>


      <section className="semanales">

<div className="wrap2">   
<h2>Clásicos Semanales</h2>
<p>Es una novedad para los más cinéfilos y quienes gustan de ver clásicos y les gustaría verlos de la mejor manera, en la pantalla grande. Cada semana habrá una temática diferente con 3 clásicos y estarán disponibles el mes completo, todos en la sala #4 exclusiva para clásicos</p>
</div> 
</section>

      {/* Tabs Section */}
      <div id="semanales">
      <div className="tab-content">

        {selectedDay === 'domingo' && (
          <div>
            <h2>Domingo - Director del mes</h2>
          <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie31/movie31.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Pulp Fiction</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie31`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie31`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie32/movie32.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Inglourious Basterds</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie32`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie32`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie33/movie33.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Django Unchained</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie33`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie33`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {selectedDay === 'lunes' && (
          <div>
            <h2>Lunes de Cine Latino</h2>
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
        )}

        {selectedDay === 'martes' && (
          <div>
            <h2>Martes de Cine Europeo</h2>
            <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie16/movie16.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>13 Tzameti</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie16`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie16`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie17/movie17.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Kynódontas </h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie17`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie17`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie18/movie18.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>La Vita è Bella</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie18`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie18`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {selectedDay === 'miercoles' && (
          <div>
            <h2>Miércoles de Cine Asiático</h2>
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
        )}

        {selectedDay === 'jueves' && (
          <div>
            <h2>Jueves de Cine Animado</h2>
            <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie22/movie22.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Persepolis</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie22`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie22`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie23/movie23.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Mary and Max</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie23`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie23`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie24/movie24.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Le Magasin des Suicides</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie24`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie24`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {selectedDay === 'viernes' && (
          <div>
            <h2>Viernes de Cine de Culto #1</h2>
            <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie25/movie25.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Heat</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie25`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie25`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie26/movie26.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Trainspotting</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie26`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie26`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie27/movie27.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Pi: Faith in Chaos</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie27`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie27`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
        )}

        {selectedDay === 'sabado' && (
          <div>
            <h2>Sábado de Cine de Culto #2</h2>
            <div className="contenedorSemnanal">
            <div className="movie-card">
              <img src="/images/movie28/movie28.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Snatch</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie28`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie28`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie29/movie29.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>A Clockwork Orange</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie29`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie29`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
                        <div className="movie-card">
              <img src="/images/movie30/movie30.webp" alt="Movie 34" />

              <div className="movie-overlay">
                <h3>Braveheart</h3>

                <div className="movie-actions">
                  <Link to={`/movie/movie30`} state={{ backgroundLocation: location }} className="btnWarning">Detalles</Link>
                  <Link to={`/buy/movie30`} state={{ backgroundLocation: location }}className=" btnWarning">Comprar</Link>    
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
       </div>
       </div>
       
       <div className="tab-section">
        <div className="tabs ">
        <button className={selectedDay === 'domingo' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('domingo');}}>Domingo</button>
        <button className={selectedDay === 'lunes' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('lunes');}}>Lunes</button>
        <button className={selectedDay === 'martes' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('martes');}}>Martes</button>
        <button className={selectedDay === 'miercoles' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('miercoles');}}>Miércoles</button>
        <button className={selectedDay === 'jueves' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('jueves');}}>Jueves</button>
        <button className={selectedDay === 'viernes' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('viernes');}}>Viernes</button>
        <button className={selectedDay === 'sabado' ? 'active' : ''} onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('sabado');}}>Sábado</button>
        </div>
      </div>
      <Vip />
      <Proximamente />
    </main>
  );
}

export default Content;