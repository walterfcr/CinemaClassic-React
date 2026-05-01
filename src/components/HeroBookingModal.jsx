import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movies } from '../data/moviesData';
import "./HeroBookingModal.css";

const HeroBookingModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [cinema, setCinema] = useState("");
  const [movieId, setMovieId] = useState("");
  const [date, setDate] = useState("");

  const [availableDates, setAvailableDates] = useState([]);

  // 🔥 GENERATE DATES BASED ON MOVIE.availableDays
  useEffect(() => {
    if (!movieId) {
      setAvailableDates([]);
      return;
    }

    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    const today = new Date();
    const dates = [];

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const day = d.getDay(); // 0 = Sunday

      // ✅ SAME LOGIC AS BuyTicket
      if (
        movie.availableDays === "all" ||
        movie.availableDays.includes(day)
      ) {
        const formatted = d.toISOString().split("T")[0];
        dates.push(formatted);
      }
    }

    setAvailableDates(dates);
    setDate(""); // reset when movie changes
  }, [movieId]);

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

        {/* 🎬 CINEMA */}
        <select value={cinema} onChange={(e) => setCinema(e.target.value)}>
          <option value="">Selecciona cine</option>
          <option>San José</option>
          <option>Heredia</option>
          <option>Cartago</option>
        </select>

        {/* 🎥 MOVIE */}
        <select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
          <option value="">Selecciona película</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        {/* 📅 DATE (SELECT — NOT INPUT) */}
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={!movieId}
        >
          <option value="">Selecciona fecha</option>

          {availableDates.map((d) => (
            <option key={d} value={d}>
              {new Date(d + "T00:00:00").toLocaleDateString("es-CR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </option>
          ))}
        </select>

        {/* 🚀 CONTINUE */}
        <button className="hero-btn btnWarning" onClick={handleContinue}>
          Continuar
        </button>

      </div>
    </div>
  );
};

export default HeroBookingModal;