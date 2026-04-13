import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { movies } from "../moviesData";
import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import QRCode from "qrcode"; // 🔥 NEW
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

  useEffect(() => {
    if (user && userData) {
      setForm((prev) => ({
        ...prev,
        name: userData.name || user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user, userData]);

  if (!movie) return null;

  const regularPrice = 3000;
  const vipPrice = 5000;

  const totalPrice = selectedSeats.reduce((acc, seat) => {
    return acc + (seat.type === "vip" ? vipPrice : regularPrice);
  }, 0);

  // 🎟 FINAL PURCHASE + QR
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

      // 🎟 CREATE TICKET
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

      // 🔳 QR DATA
      const qrValue = JSON.stringify({
        ticketId: ticketRef.id,
        movie: movie.title,
        seats: selectedIds,
        date: form.date,
        time: form.tanda,
      });

      // 🔥 GENERATE QR IMAGE
      const qrImage = await QRCode.toDataURL(qrValue);

      // 💾 SAVE QR INTO FIRESTORE
      await setDoc(ticketRef, {
        qrValue,
        qrImage
      }, { merge: true });

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

        {/* CLOSE */}
        <button className="buyticket-close" onClick={() => navigate(-1)}>
          ✕
        </button>

        {/* 🎉 SUCCESS */}
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

          // 🧾 RESUMEN
          <div className="buyticket-summary">
            <h2>Resumen de compra</h2>

            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Cine:</strong> {form.cinema}</p>
            <p><strong>Fecha:</strong> {form.date}</p>
            <p><strong>Hora:</strong> {form.tanda}</p>
            <p><strong>Butacas:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
            <p><strong>Total:</strong> ¢{totalPrice}</p>

            <button 
              className="buyticket-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>

            <button 
              className="buyticket-close"
              onClick={() => setReserved(false)}
            >
              Editar selección
            </button>
          </div>

        ) : (
          <>
            <h2 className="buyticket-title">{movie.title}</h2>

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

                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />

                <select
                  value={form.tanda}
                  onChange={(e) => setForm({ ...form, tanda: e.target.value })}
                  required
                >
                  <option value="">Seleccione tanda</option>
                  <option>11 am</option>
                  <option>3 pm</option>
                  <option>7 pm</option>
                </select>

                {/* SEATS */}
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

                {/* RESERVE */}
                <button
                  type="button"
                  className="buyticket-btn"
                  onClick={() => setReserved(true)}
                  disabled={selectedSeats.length === 0}
                >
                  Reservar butacas
                </button>

              </form>
            </div>
          </>
        )}
      </div>

      {/* SEAT MODAL */}
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