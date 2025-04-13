import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
//import './Content.css'; 
//import { useNavigate, useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



function Content() {
  const [selectedDay, setSelectedDay] = useState('domingo'); // Default tab is 'domingo'
  //const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    
    <main>
      {/* Películas en Estreno Section */}
      <div className="contentWrap" data-aos="fade-up">
        <h1>Películas en Estreno</h1>
        <div className="contenedor">
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie1/movie1.webp" alt="Movie 1" />
            <Link to={`/movie/movie01`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie2/movie2.webp" alt="Movie 2" />
            <Link to={`/movie/movie02`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie3/movie3.webp" alt="Movie 3" />
            <Link to={`/movie/movie03`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie4/movie4.webp" alt="Movie 4" />
            <Link to={`/movie/movie04`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
        </div>
        <div className="contenedor">
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie5/movie5.webp" alt="Movie 5" />
            <Link to={`/movie/movie05`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie6/movie6.webp" alt="Movie 6" />
            <Link to={`/movie/movie06`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie7/movie7.webp" alt="Movie 3" />
            <Link to={`/movie/movie07`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
          <div className="columnaEstreno tab" data-aos="flip-left">
            <img src="images/movie8/movie8.webp" alt="Movie 4" />
            <Link to={`/movie/movie08`} state={{ backgroundLocation: location }}> Detalles</Link>
            <a href="#">Comprar</a>
          </div>
        </div>
      </div>


      <section className="container-fluid semanales">
  <script>
    AOS.init();
  </script>
<div className="wrap2" data-aos="fade-up">   
<h2>Clásicos Semanales</h2>
<p>Es una novedad para los más cinéfilos y quienes gustan de ver clásicos y les gustaría verlos de la mejor manera, en la pantalla grande. Cada semana habrá una temática diferente con 3 clásicos y estarán disponibles el mes completo, todos en la sala #4 exclusiva para clásicos</p>
</div> 
</section>

      {/* Tabs Section */}
      <div id="semanales">


        {selectedDay === 'domingo' && (
          <div data-aos="zoom-in">
            <h2>Domingo - Director del mes</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie31/movie31.webp" alt="Sunday Movie 1" />
                <Link to={`/movie/movie31`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie32/movie32.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie32`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie33/movie33.webp" alt="Sunday Movie 2" />
                <Link to={`/movie/movie33`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'lunes' && (
          <div data-aos="zoom-in">
            <h2>Lunes de Cine Latino</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie13/movie13.webp" alt="Monday Movie 1" />
                <Link to={`/movie/movie13`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie14/movie14.webp" alt="Monday Movie 2" />
                <Link to={`/movie/movie14`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
                <img src="images/movie15/movie15.webp" alt="Monday Movie 2" />
                <Link to={`/movie/movie15`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'martes' && (
          <div data-aos="zoom-in">
            <h2>Martes de Cine Europeo</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie16/movie16.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie16`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie17/movie17.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie17`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie18/movie18.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie18`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'miercoles' && (
          <div data-aos="zoom-in">
            <h2>Martes de Cine Asiático</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie19/movie19.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie19`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie20/movie20.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie20`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie21/movie21.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie21`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'jueves' && (
          <div data-aos="zoom-in">
            <h2>Jueves de Cine Animado</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie22/movie22.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie22`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie23/movie23.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie23`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie24/movie24.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie24`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'viernes' && (
          <div data-aos="zoom-in">
            <h2>Viernes de Cine de Culto #1</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie25/movie25.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie25`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie26/movie26.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie26`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie27/movie27.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie27`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

        {selectedDay === 'sabado' && (
          <div data-aos="zoom-in">
            <h2>Sábado de Cine de Culto #2</h2>
            <div className="contenedor">
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie28/movie28.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie28`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie29/movie29.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie29`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
              <div className="columnaEstreno tab" data-aos="flip-left">
              <img src="images/movie30/movie30.webp" alt="Monday Movie 1" />
              <Link to={`/movie/movie30`} state={{ backgroundLocation: location }}> Detalles</Link>
                <a href="#">Comprar</a>
              </div>
            </div>
          </div>
        )}

       </div>
       
       <div className="tab-section" data-aos="fade-up">
        <div className="tabs">
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('lunes'); }}>Lunes</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('martes'); }}>Martes</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('miercoles'); }}>Miercoles</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('jueves'); }}>Jueves</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('viernes'); }}>Viernes</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('sabado'); }}>Sábado</button>
        <button type="button" onClick={(e) => {e.preventDefault();e.stopPropagation();setSelectedDay('domingo'); }}>Domingo</button>
        </div>
      </div>
    </main>
  );
}

export default Content;