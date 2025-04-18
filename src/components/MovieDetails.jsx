import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../moviesData";
import { useEffect, useState } from "react";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const movie = movies.find((m) => m.id === id);

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
                <p><strong>Director:</strong> {movie.director}</p>
                <p><strong>País:</strong> {movie.country}</p>
                <p><strong>Año:</strong> {movie.year}</p>
                <p><strong>Sinopsis:</strong> {movie.synopsis}</p>
              </div>
            </div>
            <div className="columnaMovie">
              <h2>Reparto</h2>
              <div className="contenedorReparto">
                {movie.cast.map((actor, i) => (
                  <div className="columnaReparto" key={i}>
                    <h4 dangerouslySetInnerHTML={{ __html: actor.name }} />
                    <img src={actor.img} alt={actor.name} />
                  </div>
                ))}
              </div>
              <div className="columnaEstreno test tab">
                <a href="#"  onClick={(e) => {e.preventDefault(); setShowTrailer(true);}}>Ver Trailer</a>
                <a href="#">Comprar</a>
              </div>
            </div>
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