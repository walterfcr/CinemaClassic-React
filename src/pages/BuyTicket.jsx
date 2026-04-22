import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { movies } from "../moviesData";
import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import QRCode from "qrcode";
import { useAuth } from "../context/AuthContext";
import SeatSelectorModal from "./SeatSelectorModal";
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

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);
  const [loading, setLoading] = useState(false);

  const [reserved, setReserved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 🔥 RESERVA REAL
  const [reservation, setReservation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const timeSlots = [
    { label: "11 am", value: "11:00" },
    { label: "3 pm", value: "15:00" },
    { label: "7 pm", value: "19:00" },
  ];

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isPastTime = (date, time) => {
    if (!date) return false;
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}:00`);
    return selectedDateTime <= now;
  };

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

  // 📅 DATES
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
    if (!form.date && availableDates.length > 0) {
      setForm(prev => ({ ...prev, date: availableDates[0] }));
    }
  }, [availableDates]);

  useEffect(() => {
    if (form.tanda && isPastTime(form.date, form.tanda)) {
      setForm(prev => ({ ...prev, tanda: "" }));
    }
  }, [form.date]);

  // ⏳ TIMER REAL (UNO SOLO)
  useEffect(() => {
    if (!reservation) return;

    const interval = setInterval(() => {
      const remaining = Math.floor((reservation.expiresAt - Date.now()) / 1000);

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        expireReservation();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reservation]);

  const expireReservation = async () => {
    try {
      if (!reservation) return;

      await deleteDoc(doc(db, "reservations", reservation.id));

      setReservation(null);
      setReserved(false);
      setSelectedSeats([]);

      alert("⏰ Reserva expirada");
    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return null;

  const regularPrice = 3000;
  const vipPrice = 5000;

  const totalPrice = selectedSeats.reduce((acc, seat) => {
    return acc + (seat.type === "vip" ? vipPrice : regularPrice);
  }, 0);

  const handleSubmit = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    setLoading(true);

    try {
      const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
      const showtimeRef = doc(db, "showtimes", showtimeId);

      const snap = await getDoc(showtimeRef);
      const existingSeats = snap.exists() ? snap.data().occupiedSeats || [] : [];

      const selectedIds = selectedSeats.map(s => s.id);

      const conflict = selectedIds.some(id => existingSeats.includes(id));

      if (conflict) {
        alert("⚠️ Algunas butacas ya fueron reservadas");
        setLoading(false);
        return;
      }

      const updatedSeats = [...new Set([...existingSeats, ...selectedIds])];

      await setDoc(showtimeRef, {
        movieId: movie.id,
        date: form.date,
        tanda: form.tanda,
        cinema: form.cinema,
        occupiedSeats: updatedSeats,
        updatedAt: serverTimestamp()
      });

      const ticketRef = await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        userEmail: user.email,
        movieId: movie.id,
        movieTitle: movie.title,
        movieBanner: movie.banner,
        ...form,
        seats: selectedSeats,
        total: totalPrice,
        createdAt: serverTimestamp(),
      });

      const qrValue = `https://cinema-classic-react.vercel.app/ticket/${ticketRef.id}`;
      const qrImage = await QRCode.toDataURL(qrValue);

      await setDoc(ticketRef, {
        qrValue,
        qrImage
      }, { merge: true });

      // 🔥 LIMPIAR RESERVA
      if (reservation) {
        await deleteDoc(doc(db, "reservations", reservation.id));
      }

      setSubmitted(true);

    } catch (err) {
      console.error(err);
      alert("Error al guardar la compra");
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

            <button className="buyticket-btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </div>

        ) : reserved ? (
          <div className="buyticket-summary">
            <h2>Resumen de compra</h2>

            <p style={{ color: timeLeft < 60 ? "red" : "white" }}>
              ⏳ Tiempo restante: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>

            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Cine:</strong> {form.cinema}</p>
            <p><strong>Fecha:</strong> {form.date}</p>
            <p><strong>Hora:</strong> {form.tanda}</p>
            <p><strong>Butacas:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
            <p><strong>Total:</strong> ¢{totalPrice}</p>

            <button className="buyticket-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>

            <button className="buyticket-close" onClick={() => setReserved(false)}>
              Editar selección
            </button>
          </div>

        ) : (
          <>
            <h2 className="buyticket-title">{movie.title}</h2>

            <div className="buyticket-body">
              <img src={movie.banner} alt={movie.title} />

              <form onSubmit={(e) => e.preventDefault()}>

                {/* TU FORM ORIGINAL — INTACTO */}

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
                  onClick={() => setShowSeats(true)}
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
                    if (!user) return alert("Debes iniciar sesión");

                    const expiresAt = Date.now() + 10 * 60 * 1000;

                    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;

                    const ref = await addDoc(collection(db, "reservations"), {
                      userId: user.uid,
                      showtimeId,
                      seats: selectedSeats,
                      expiresAt,
                      status: "active",
                      createdAt: serverTimestamp()
                    });

                    setReservation({ id: ref.id, expiresAt });
                    setTimeLeft(10 * 60);
                    setReserved(true);
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