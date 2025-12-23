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

  return (
    <div className="seat-overlay">
      <div className="seat-modal">
        <h3>Selecciona tus butacas (máx 10)</h3>
        <div className="seat-prices">
            <span className="price-regular">🎟 Regular: ¢3000</span>
            <span className="price-vip">⭐ VIP (filas G–H): ¢5000</span>
        </div>

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

        <button className="seat-confirm" onClick={onClose}>
          Confirmar butacas
        </button>
      </div>
    </div>
  );
};

export default SeatSelectorModal;
