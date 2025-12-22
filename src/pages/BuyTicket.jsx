import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { movies } from "../moviesData";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./BuyTicket.css";

const BuyTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  const prices = {
    regular: 3000,
    vip: 5000
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    cinema: "",
    date: "",
    tanda: "",
    type: "regular"
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!movie) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "tickets"), {
        movieId: movie.id,
        movieTitle: movie.title,
        ...form,
        price: prices[form.type],
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
    } catch (error) {
      alert("Error al reservar entrada");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buyticket-overlay" onClick={() => navigate(-1)}>
      <div
        className="buyticket-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="buyticket-close"
          onClick={() => navigate(-1)}
        >
          ✕
        </button>

        {submitted ? (
          <div className="buyticket-success">
            <h2>🎬 Entrada reservada</h2>
            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Nombre:</strong> {form.name}</p>
            <p><strong>Tipo:</strong> {form.type}</p>
            <p><strong>Total:</strong> ₡{prices[form.type]}</p>

            <button
              className="buyticket-btn"
              onClick={() => navigate("/")}
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            <h2 className="buyticket-title">{movie.title}</h2>

            <div className="buyticket-body">
              <img
                src={movie.banner}
                alt={movie.title}
                className="buyticket-image"
              />

              <form onSubmit={handleSubmit} className="buyticket-form">
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                  required
                >
                  <option value="regular">Regular ₡3000</option>
                  <option value="vip">VIP ₡5000</option>
                </select>

                <input
                  type="text"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />

                <select
                  value={form.cinema}
                  onChange={(e) =>
                    setForm({ ...form, cinema: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                  required
                />

                <select
                  value={form.tanda}
                  onChange={(e) =>
                    setForm({ ...form, tanda: e.target.value })
                  }
                  required
                >
                  <option value="">Seleccione tanda</option>
                  <option>11 am</option>
                  <option>3 pm</option>
                  <option>7 pm</option>
                </select>

                <div className="buyticket-price">
                  Total: ₡{prices[form.type]}
                </div>

                <button
                  type="submit"
                  className="buyticket-btn"
                  disabled={loading}
                >
                  {loading ? "Reservando..." : "Reservar entrada"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyTicket;
