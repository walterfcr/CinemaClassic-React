import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { movies } from "../data/moviesData";
import { useAuth } from "../context/AuthContext";
import SeatSelectorModal from "../components/SeatSelectorModal";
import { formatLocalDate, isPastTime, formatTime } from "../utils/dateUtils";
import { confirmPurchaseService } from "../services/showtimeService";
import { useReservationTimer } from "../hooks/useReservationTimer";
import { useSeatsReservation } from "../hooks/useSeatsReservation";
import "./BuyTicket.css";

const BuyTicket = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const movie = movies.find((m) => m.id === id);
  const { user, userData } = useAuth();

  const preselected = location.state?.preselected;

  const [form, setForm] = useState({
    name: "",
    email: "",
    cinema: preselected?.cinema || "",
    date: preselected?.date || "",
    tanda: "",
  });

  const [showSeats, setShowSeats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


    const {
    selectedSeats,
    setSelectedSeats,
    reserved,
    reserveSeats,
    releaseSeats
  } = useSeatsReservation({
    movie,
    form,
    user
  });

  const timeSlots = [
    { label: "11 am", value: "11:00" },
    { label: "3 pm", value: "15:00" },
    { label: "7 pm", value: "19:00" },
  ];



  // AUTO FILL
  useEffect(() => {
    if (user && userData) {
      setForm((prev) => ({
        ...prev,
        name: userData.name || user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user, userData]);

  // FECHAS
  const availableDates = useMemo(() => {
    if (!movie) return [];

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const day = d.getDay();

      if (
        movie.availableDays === "all" ||
        movie.availableDays?.includes(day)
      ) {
        dates.push(formatLocalDate(d));
      }
    }

    return dates;
  }, [movie]);

  useEffect(() => {
  if (!errorMsg) return;

  const duration = errorMsg.includes("❌") ? 5000 : 3000;

  const timeout = setTimeout(() => {
    setErrorMsg("");
  }, duration);

    return () => clearTimeout(timeout);
  }, [errorMsg]);

  useEffect(() => {
    if (!form.date && availableDates.length > 0) {
      setForm(prev => ({ ...prev, date: availableDates[0] }));
    }
  }, [availableDates]);

  useEffect(() => {
    if (form.tanda && isPastTime(form.date, form.tanda)) {
      setForm(prev => ({ ...prev, tanda: "" }));
    }
  }, [form.date]);

const timeLeft = useReservationTimer({
  reserved,
  user,
  movie,
  form,
  selectedSeats,
  submitted
});

        useEffect(() => {
      if (submitted) return; // 🛑 CRITICAL FIX

      if (timeLeft === 0 && reserved) {
        setErrorMsg("⏳ Tu reserva expiró");
        releaseSeats();
      }
    }, [timeLeft, submitted]);



  if (!movie) return null;

  const totalPrice = selectedSeats.reduce((acc, seat) => {
    return acc + (seat.type === "vip" ? 5000 : 3000);
  }, 0);

  const handleSubmit = async () => {
  if (loading) return;

  if (!user) {
    alert("Debes iniciar sesión para comprar");
    return;
  }

  if (timeLeft === 0) {
    alert("⏳ Tu reserva expiró");
    return;
  }

  setLoading(true);

  try {
    await confirmPurchaseService({
      movie,
      form,
      selectedSeats,
      user,
      totalPrice
    });

    setSubmitted(true);

  } catch (err) {
    console.error(err);

    if (err.message === "Reservation expired") {
      setErrorMsg("⏳ Tu reserva expiró, intenta de nuevo");
      await releaseSeats();
    } else if (err.message === "Seats taken") {
      setErrorMsg("⚠️ Algunos asientos ya no están disponibles. Elige otros.");
      await releaseSeats();
    } else {
      setErrorMsg("❌ Error inesperado. Intenta de nuevo.");
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="buyticket-overlay">
      <div className="buyticket-modal">

        <button className="buyticket-close" onClick={() => navigate(-1)}>
          ✕
        </button>

        {submitted ? (
          <div className="buyticket-success">
            <h2>🎬 Entrada comprada</h2>
            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Butacas:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
            <p><strong>Total:</strong> ¢{totalPrice}</p>

            {errorMsg && (
              <div className="buyticket-error">
                {errorMsg}
              </div>
            )}

            <button className="buyticket-btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>

            </div>

        ) : reserved ? (
          <div className="buyticket-summary">
            <h2>Resumen de compra</h2>

            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Cine:</strong> {form.cinema}</p>
            <p><strong>Fecha:</strong> {form.date}</p>
            <p><strong>Hora:</strong> {form.tanda}</p>
            <p><strong>Butacas:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
            <p><strong>Total:</strong> ¢{totalPrice}</p>

            <div style={{ 
              margin: "10px 0", 
              fontWeight: "bold", 
              color: timeLeft < 60 ? "red" : "white" 
            }}>
              ⏳ Tiempo restante: {formatTime(timeLeft)}
            </div>

            <button
              className="btnEdit"
              onClick={async () => {
                await releaseSeats();
              }}
            >
              Editar selección
            </button>

            <button className="buyticket-btn" onClick={handleSubmit} disabled={loading || selectedSeats.length === 0 || timeLeft === 0}>
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>

          </div>

        ) : (
          <>
            <h2 className="buyticket-title">{movie.title}</h2>
            {errorMsg && (
              <div className="buyticket-error">
                {errorMsg}
              </div>
            )}

            <div className="buyticket-body">
              <img src={movie.banner} alt={movie.title} />

              <form onSubmit={(e) => e.preventDefault()}>

                <input
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />

                <select
                  value={form.cinema}
                  onChange={(e) => setForm({ ...form, cinema: e.target.value })}
                  required
                >
                  <option value="">Seleccione cine</option>
                  <option>San José</option>
                  <option>Heredia</option>
                  <option>Cartago</option>
                </select>

                <select
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                >
                  <option value="">Selecciona fecha</option>

                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date + "T00:00:00").toLocaleDateString("es-CR", {
                        weekday: "long",
                        month: "short",
                        day: "numeric"
                      })}
                    </option>
                  ))}
                </select>

                <select
                  value={form.tanda}
                  onChange={(e) => setForm({ ...form, tanda: e.target.value })}
                  required
                >
                  <option value="">Seleccione tanda</option>

                  {timeSlots.map(slot => {
                    const disabled = isPastTime(form.date, slot.value);

                    return (
                      <option key={slot.value} value={slot.value} disabled={disabled}>
                        {slot.label} {disabled ? "(no disponible)" : ""}
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  className="buyticket-btn"
                   onClick={() => {
                    setErrorMsg("");   // 🔥 clear old error
                    setShowSeats(true);
                  }}
                  disabled={!form.cinema || !form.date || !form.tanda}
                >
                  Elegir butacas ({selectedSeats.length})
                </button>

                <div className="buyticket-price">
                  Total: ¢{totalPrice}
                </div>

                <button
                  type="button"
                  className="buyticket-btn"
                 onClick={async () => {
                    try {
                      await reserveSeats();
                    } catch (err) {
                      if (err.message === "NOT_AUTH") {
                        alert("Debes iniciar sesión");
                      } else {
                        alert("⚠️ Algunas butacas no están disponibles");
                      }
                    }
                  }}
                  disabled={selectedSeats.length === 0}
                >
                  Reservar butacas
                </button>

              </form>
            </div>
          </>
        )}
      </div>

      {showSeats && (
        <SeatSelectorModal
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          onClose={() => setShowSeats(false)}
          movie={movie}
          form={form}
        />
      )}
    </div>
  );
};

export default BuyTicket;