import { useParams, useNavigate, useLocation } from "react-router-dom";
import { movies } from "../moviesData";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const movie = movies.find((m) => m.id === id);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!movie) return <p>Película no encontrada</p>;

  return (
    <>
      <div className="modal-overlay" onClick={() => navigate(-1)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => navigate(-1)}>✖</button>
          <h1>{movie.title}</h1>
          <hr style={{ border: "1px solid #ccc", margin: "1rem 0" }} />
          <div className="containerMovie">
            <div className="columnaMovie bannerMovie">
              <img src={movie.banner} alt={movie.title} />
            </div>
            <div className="columnaMovie">
              <div className="info">
                <p><span className="label">Director</span> {movie.director}</p>
                <p><span className="label">País:</span> {movie.country}</p>
                <p><span className="label">Año:</span> {movie.year}</p>
                <p><span className="label">Duraciión:</span> {movie.duration}</p>
                <p><span className="label">Genero:</span> {movie.genre}</p>
                <p><span className="label">Clasificación:</span> {movie.rating}</p>
                <p><span className="label">Sinopsis:</span> {movie.synopsis}</p>
              </div>
            </div>
            <div className="columnaMovie cast-section">
              <h2>Reparto</h2>
              <div className="contenedorReparto">
                {movie.cast.map((actor, i) => (
                  <div className="columnaReparto" key={i}>
                    <h4 dangerouslySetInnerHTML={{ __html: actor.name }} />
                    <img src={actor.img} alt={actor.name} />
                  </div>
                ))}
              </div> 
              
              
            </div>
          </div>
                        <div className="modal-footer">
                <button 
                  onClick={() => setShowTrailer(true)} 
                  className="btnSecondaryDetail"
                >
                  ▶ Ver trailer
                </button>

                <button 
                  onClick={() => navigate(`/buy/${movie.id}`, { state: { backgroundLocation: location } })}
                  className="btnPrimary"
                >
                  Comprar entrada
                </button>
              </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal-overlay" onClick={() => setShowTrailer(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowTrailer(false)}>✖</button>
            <div className="video-wrapper">
              <iframe
                src={movie.trailer} 
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}