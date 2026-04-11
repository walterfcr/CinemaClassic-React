import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { movies } from "../moviesData";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import SeatSelectorModal from "./SeatSelectorModal";
import "./BuyTicket.css";

const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 NEW

  const movie = movies.find((m) => m.id === id);
  const { user, userData } = useAuth();

  // 👇 PRESELECTED DATA FROM HERO
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
  const [submitted, setSubmitted] = useState(false);

  // 👇 Auto-fill user data
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Selecciona al menos una butaca");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "tickets"), {
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

        {submitted ? (
          <div className="buyticket-success">
            <h2>🎬 Entrada reservada</h2>
            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Butacas:</strong> {selectedSeats.map(s => s.id).join(", ")}</p>
            <p><strong>Total:</strong> ¢{totalPrice}</p>

            <button className="buyticket-btn" onClick={() => navigate("/")}>
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            <h2 className="buyticket-title">{movie.title}</h2>

            <div className="buyticket-body">
              <img src={movie.banner} alt={movie.title} />

              <form onSubmit={handleSubmit}>

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
                >
                  Elegir butacas ({selectedSeats.length})
                </button>

                <div className="buyticket-price">
                  Total: ¢{totalPrice}
                </div>

                <button className="buyticket-btn" disabled={loading}>
                  {loading ? "Comprando..." : "Comprar entradas"}
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
        />
      )}
    </div>
  );
};

export default BuyTicket;