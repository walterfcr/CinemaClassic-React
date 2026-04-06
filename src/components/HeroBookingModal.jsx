import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from "../moviesData";
import "./HeroBookingModal.css";

const HeroBookingModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");
  const [movieId, setMovieId] = useState("");

  const handleContinue = () => {
    if (!cinema || !date || !movieId) {
      alert("Completa todos los campos");
      return;
    }

    navigate(`/buy/${movieId}`, {
      state: {
        preselected: {
          cinema,
          date,
        },
      },
    });
  };

  return (
    <div className="hero-modal-overlay">
      <div className="hero-modal">
        
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Encuentra tu función</h2>

        <select value={cinema} onChange={(e) => setCinema(e.target.value)}>
          <option value="">Selecciona cine</option>
          <option>San José</option>
          <option>Heredia</option>
          <option>Cartago</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
          <option value="">Selecciona película</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        <button className="hero-btn btnWarning" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default HeroBookingModal;