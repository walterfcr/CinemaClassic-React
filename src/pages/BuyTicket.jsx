import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useRef  } from "react";
import { movies } from "../moviesData";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  setDoc
} from "firebase/firestore";
import QRCode from "qrcode";
import { useAuth } from "../context/AuthContext";
import SeatSelectorModal from "../components/SeatSelectorModal";
import { runTransaction } from "firebase/firestore";
import "./BuyTicket.css";

  const BuyTicket = () => {

  const timerRef = useRef(null);
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
  const [timeLeft, setTimeLeft] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  
  const reserveSeats = async () => {
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
    const showtimeRef = doc(db, "showtimes", showtimeId);

    const selectedIds = selectedSeats.map(s => s.id);

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(showtimeRef);
      const data = snap.exists() ? snap.data() : {};

      const occupied = data.occupiedSeats || [];
      const reserved = data.reservedSeats || [];

      const now = Date.now();

      const validReserved = reserved.filter(r => r.expiresAt > now);

      const conflict = selectedIds.some(id =>
        occupied.includes(id) ||
        validReserved.some(r => r.seatId === id)
      );

      if (conflict) {
        throw new Error("Seats not available");
      }

      const newReservations = selectedIds.map(id => ({
        seatId: id,
        userId: user.uid,
        expiresAt: now + 5 * 60 * 1000
      }));

      // ✅ FIX: NO sobrescribir documento
      transaction.set(showtimeRef, {
        ...data,
        reservedSeats: [...validReserved, ...newReservations]
      });

    });
  };

    const releaseSeats = async () => {
    if (!user) return;

    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
    const showtimeRef = doc(db, "showtimes", showtimeId);

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(showtimeRef);
      if (!snap.exists()) return;

      const data = snap.data();
      const reserved = data.reservedSeats || [];

      const selectedIds = selectedSeats.map(s => s.id);

      // 🔥 remove ONLY my reservations for those seats
      const updatedReserved = reserved.filter(r =>
        !(r.userId === user.uid && selectedIds.includes(r.seatId))
      );

      transaction.set(showtimeRef, {
        ...data,
        reservedSeats: updatedReserved
      });
    });
  };

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

  const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
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

  useEffect(() => {
  if (!reserved || !user) return;

  const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
  const ref = doc(db, "showtimes", showtimeId);

  const unsubscribe = onSnapshot(ref, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    const reservedSeats = data.reservedSeats || [];

    // 🔥 buscar MIS reservas
    const selectedIds = selectedSeats.map(s => s.id);

    const myReservations = reservedSeats.filter(r =>
      r.userId === user.uid &&
      selectedIds.includes(r.seatId)
    );

    if (myReservations.length === 0) {
      if (submitted) {
        setTimeLeft(0);
      }
      return;
    }

    // tomar el primero (todos deberían tener mismo expiresAt)
    const expiresAt = myReservations[0].expiresAt;

    const updateTimer = () => {
      const diff = expiresAt - Date.now();
      setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
    };

    updateTimer();
    if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(updateTimer, 1000);

      // cleanup when snapshot re-runs or component unmounts
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
        });

  return () => unsubscribe();

}, [reserved, user, movie.id, form.date, form.tanda, form.cinema]);

  useEffect(() => {
  if (submitted) return; // 🚫 stop everything after purchase

  if (timeLeft === 0 && reserved) {
    setErrorMsg("⏳ Tu reserva expiró");
    setReserved(false);
    setSelectedSeats([]);
  }
}, [timeLeft, submitted]);

  

  useEffect(() => {
  setSelectedSeats([]);
  setReserved(false);
  }, [form.date, form.tanda, form.cinema]);

  if (!movie) return null;

  const totalPrice = selectedSeats.reduce((acc, seat) => {
    return acc + (seat.type === "vip" ? 5000 : 3000);
  }, 0);

  // ===============================
  // 🔥 CONFIRM PURCHASE (FIX REAL)
  // ===============================
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
      const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
      const showtimeRef = doc(db, "showtimes", showtimeId);

      await runTransaction(db, async (transaction) => {
        const snap = await transaction.get(showtimeRef);
        const data = snap.exists() ? snap.data() : {};

        const occupied = data.occupiedSeats || [];
        const reserved = data.reservedSeats || [];

        const selectedIds = selectedSeats.map(s => s.id);

        const now = Date.now();

        const validUserSeats = reserved.filter(r =>
          r.userId === user.uid &&
          selectedIds.includes(r.seatId) &&
          r.expiresAt > now
        );

        if (validUserSeats.length !== selectedIds.length) {
          throw new Error("Reservation expired");
        }

        if (validUserSeats.length === 0) {
          throw new Error("Reservation expired");
        }

        // 🔥 VALIDACIÓN REAL
        const expired = validUserSeats.some(r => r.expiresAt <= Date.now());

        if (expired) {
          throw new Error("Reservation expired");
        }

        const mySeatIds = validUserSeats.map(s => s.seatId);

        if (mySeatIds.length === 0) {
          throw new Error("Reservation expired");
        }

        const conflict = mySeatIds.some(id => occupied.includes(id));

        if (conflict) {
          throw new Error("Seats taken");
        }

        // ✅ FIX CLAVE: NO borrar reservas de otros
        const remainingReserved = reserved.filter(r =>
          !(r.userId === user.uid && mySeatIds.includes(r.seatId))
        );

        transaction.set(showtimeRef, {
          ...data,
          occupiedSeats: [...occupied, ...mySeatIds],
          reservedSeats: remainingReserved,
          updatedAt: serverTimestamp()
        });
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

      setSubmitted(true);

    } catch (err) {
      console.error(err);

      if (err.message === "Reservation expired") {
        setErrorMsg("⏳ Tu reserva expiró, intenta de nuevo");
        setReserved(false);
        setSelectedSeats([]);
      } else if (err.message === "Seats taken") {
        setErrorMsg("⚠️ Algunos asientos ya no están disponibles. Elige otros.");
        setReserved(false);
        setSelectedSeats([]);
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
                await releaseSeats(); // 🔥 key fix
                setReserved(false);
                setSelectedSeats([]);
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
                      setReserved(true);
                    } catch (err) {
                      console.error("reserveSeats error:", err);
                      alert("⚠️ Algunas butacas ya no están disponibles");
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