import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { weeklySchedule } from '../data/weeklySchedule';
import { movies } from '../moviesData'; // Your central movie database
import Proximamente from '../components/Proximamente';

function WeeklyPage() {
  const { day } = useParams(); // e.g., /semanal/lunes
  const location = useLocation();
  
  // Get the specific data for the current day
  const dayData = weeklySchedule[day.toLowerCase()];


  if (!dayData) return <div>Día no encontrado</div>;

  return (
    <main>
      <section className="semanal-banner" style={{ backgroundImage: `url('${dayData.banner}')` }}>
        <h1>{dayData.title}</h1>
        <p>{dayData.description}</p>
      </section>

      <div id="semanales">
        <div className="contenedorSemnanal">
          {dayData.movies.map((movieId) => {
            const movie = movies.find(m => m.id === movieId);
            if (!movie) return null;

            return (
              <div className="movie-card" key={movie.id}>
                <img src={movie.banner} alt={movie.title} />
                <div className="movie-overlay">
                  <h3>{movie.title}</h3>
                  <div className="movie-actions">
                    <Link to={`/movie/${movie.id}`} state={{ backgroundLocation: location }} className="btnSecondary">
                      Detalles
                    </Link>
                    <Link to={`/buy/${movie.id}`} state={{ backgroundLocation: location }} className="btnWarning">
                      Comprar
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Proximamente />
    </main>
  );
}

export default WeeklyPage;