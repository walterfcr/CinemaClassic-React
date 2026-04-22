import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
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

  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {

    // 🛡️ VALIDACIÓN
    if (!form?.date || !form?.tanda || !form?.cinema || !movie) {
      setOccupiedSeats([]);
      setReservedSeats([]);
      return;
    }

    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;

    // 🎬 SHOWTIMES (asientos comprados)
    const showtimeRef = doc(db, "showtimes", showtimeId);

    const unsubShowtime = onSnapshot(showtimeRef, (snap) => {
      if (snap.exists()) {
        setOccupiedSeats(snap.data().occupiedSeats || []);
      } else {
        setOccupiedSeats([]);
      }
    });

    // 🔥 RESERVATIONS (asientos bloqueados temporalmente)
    const q = query(
      collection(db, "reservations"),
      where("showtimeId", "==", showtimeId),
      where("status", "==", "active")
    );

    const unsubReservations = onSnapshot(q, (snapshot) => {
      let temp = [];

      snapshot.forEach(doc => {
        const data = doc.data();

        // ⏰ ignorar reservas expiradas
        if (data.expiresAt > Date.now()) {
          const seats = data.seats.map(s => s.id);
          temp.push(...seats);
        }
      });

      setReservedSeats(temp);
    });

    return () => {
      unsubShowtime();
      unsubReservations();
    };

  }, [movie?.id, form?.date, form?.tanda, form?.cinema]);

  const toggleSeat = (row, col) => {
    const id = `${row}${col}`;
    const isVip = row === "G" || row === "H";

    // 🚫 bloqueado si está comprado o reservado
    if (occupiedSeats.includes(id) || reservedSeats.includes(id)) return;

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

        {/* CLOSE */}
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
        </div>

        {/* GRID */}
        <div className="seat-grid">
          {rows.flatMap(row =>
            cols.map(col => {
              const id = `${row}${col}`;
              const isSelected = selectedSeats.some(s => s.id === id);
              const isVip = row === "G" || row === "H";
              const isOccupied = occupiedSeats.includes(id);
              const isReserved = reservedSeats.includes(id);

              return (
                <button
                  key={id}
                  disabled={isOccupied || isReserved}
                  className={`seat 
                    ${isVip ? "vip" : ""} 
                    ${isSelected ? "selected" : ""} 
                    ${isOccupied ? "occupied" : ""} 
                    ${isReserved ? "reserved" : ""}
                  `}
                  onClick={() => toggleSeat(row, col)}
                >
                  {id}
                </button>
              );
            })
          )}
        </div>

        {/* SELECTED */}
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