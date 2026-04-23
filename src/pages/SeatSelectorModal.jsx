import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import "./SeatSelector.css";

const rows = ["A","B","C","D","E","F","G","H"];
const cols = Array.from({ length: 15 }, (_, i) => i + 1);

const SeatSelectorModal = ({ 
  selectedSeats, 
  setSelectedSeats, 
  onClose, 
  movie, 
  form 
}) => {

  const [occupiedSeats, setOccupiedSeats] = useState({});

  useEffect(() => {

    // 🛡️ SAFETY CHECK
    if (!form || !form.date || !form.tanda || !form.cinema || !movie) {
      setOccupiedSeats([]);
      return;
    }

    const today = new Date();
    const selectedDate = new Date(form.date);

    today.setHours(0,0,0,0);
    selectedDate.setHours(0,0,0,0);

    // ❌ Ignore past dates
    if (selectedDate < today) {
      setOccupiedSeats([]);
      return;
    }

    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
    const ref = doc(db, "showtimes", showtimeId);

    // 🔥 REAL-TIME LISTENER
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {

        const data = snap.data().occupiedSeats || [];
        const now = Date.now();

        // 🔥 FILTRO IMPORTANTE (aquí está la magia)
        const validSeats = data.filter(seat => {
          // mantener si:
          // - está vendido
          // - o no ha expirado
          return seat.status === "sold" || seat.expiresAt > now;
        });

        // 👇 SOLO IDs
        const seatMap = {};

        validSeats.forEach(seat => {
          seatMap[seat.id] = seat.status; // "held" o "sold"
        });

        setOccupiedSeats(seatMap);

      } else {
        setOccupiedSeats([]);
        console.log("occupiedSeats: empty");
      }
    });

    // 🧹 CLEANUP
    return () => unsubscribe();

  }, [movie?.id, form?.date, form?.tanda, form?.cinema]);

  const toggleSeat = (row, col) => {
    const id = `${row}${col}`;
    const isVip = row === "G" || row === "H";

    // 🚫 Block occupied seats
    const seatStatus = occupiedSeats[id];

    if (seatStatus === "sold" || seatStatus === "held") return;

    const exists = selectedSeats.find(s => s.id === id);

    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== id));
    } else {
      if (selectedSeats.length >= 10) return;

      setSelectedSeats([
        ...selectedSeats,
        { id, type: isVip ? "vip" : "regular" }
      ]);
    }
  };

  const getTotal = () => {
    return selectedSeats.reduce((acc, seat) => {
      return acc + (seat.type === "vip" ? 5000 : 3000);
    }, 0);
  };

  return (
    <div className="seat-overlay">
      <div className="seat-modal">

        {/* CLOSE BUTTON */}
        <button className="seat-close" onClick={onClose}>
          ✕
        </button>

        <h3>Selecciona tus butacas (máx 10)</h3>

        {/* SCREEN */}
        <div className="seat-screen"></div>

        {/* LEGEND */}
        <div className="seat-prices">
          <span className="price-regular">🎟 Regular: ¢3000</span>
          <span className="price-vip">⭐ VIP (filas G–H): ¢5000</span>
          <span style={{color:"#e6b800"}}>🟡 Reservado</span>
          <span style={{color:"#777"}}>⚫ Ocupado</span>
        </div>

        {/* GRID */}
        <div className="seat-grid">
          {rows.flatMap(row =>
            cols.map(col => {
              const id = `${row}${col}`;
              const isSelected = selectedSeats.some(s => s.id === id);
              const isVip = row === "G" || row === "H";
              const seatStatus = occupiedSeats[id]; // undefined | held | sold

              const isOccupied = seatStatus === "sold" || seatStatus === "held";

              return (
                <button
                  key={id}
                  disabled={isOccupied}
                  className={`seat 
                    ${isVip ? "vip" : ""} 
                    ${isSelected ? "selected" : ""} 
                    ${seatStatus === "held" ? "held" : ""} 
                    ${seatStatus === "sold" ? "sold" : ""}
                  `}
                  onClick={() => toggleSeat(row, col)}
                >
                  {id}
                </button>
              );
            })
          )}
        </div>

        {/* SELECTED SEATS */}
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <strong>Butacas seleccionadas:</strong>{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map(s => s.id).join(", ")
            : "Ninguna"}
        </div>

        {/* TOTAL */}
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          <strong>Total:</strong> ¢{getTotal()}
        </div>

        {/* CONFIRM */}
        <button className="seat-confirm" onClick={onClose}>
          Confirmar butacas
        </button>

      </div>
    </div>
  );
};

export default SeatSelectorModal;