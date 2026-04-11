import "./SeatSelector.css";

const rows = ["A","B","C","D","E","F","G","H"];
const cols = Array.from({ length: 15 }, (_, i) => i + 1);

const SeatSelectorModal = ({ selectedSeats, setSelectedSeats, onClose }) => {

  const toggleSeat = (row, col) => {
    const id = `${row}${col}`;
    const isVip = row === "G" || row === "H";

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
        </div>

        {/* GRID */}
        <div className="seat-grid">
          {rows.flatMap(row =>
            cols.map(col => {
              const id = `${row}${col}`;
              const isSelected = selectedSeats.some(s => s.id === id);
              const isVip = row === "G" || row === "H";

              return (
                <button
                  key={id}
                  className={`seat ${isVip ? "vip" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(row, col)}
                >
                  {id}
                </button>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <strong>Butacas seleccionadas:</strong>{" "}
          {selectedSeats.length > 0
            ? selectedSeats.map(s => s.id).join(", ")
            : "Ninguna"}
        </div>

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