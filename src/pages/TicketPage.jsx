import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./TicketPage.css";
import "./MyTickets.css";

const TicketPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ref = doc(db, "tickets", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setTicket(snap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <p style={{ color: "#fff" }}>Cargando...</p>;
  if (!ticket) return <p style={{ color: "#fff" }}>Ticket no encontrado</p>;

  return (
    <div className="ticket-page">
  <div className="ticket-card upcoming"> {/* puedes quitar upcoming si quieres */}

    <div className="ticket-top">

      {/* IMAGE */}
      <div className="ticket-image">
        {ticket.movieBanner ? (
          <img src={ticket.movieBanner} alt={ticket.movieTitle} />
        ) : (
          <div className="ticket-placeholder">🎬</div>
        )}
      </div>

      {/* DETAILS */}
      <div className="ticket-details">
        <h3 className="ticket-title">{ticket.movieTitle}</h3>

        <div className="ticket-info">
          <div className="info-row">📅 {ticket.date}</div>
          <div className="info-row">🕐 {ticket.tanda}</div>
          <div className="info-row">📍 {ticket.cinema}</div>
          <div className="info-row">
            💺 {ticket.seats?.map(s => s.id).join(", ") || "N/A"}
          </div>
        </div>

        {/* QR */}
        {ticket.qrImage && (
          <div className="ticket-qr">
            <img src={ticket.qrImage} alt="QR Code" />
          </div>
        )}

        <div className="ticket-footer">
          <span className="ticket-total">
            ¢{ticket.total?.toLocaleString()}
          </span>
        </div>

        <p className="ticket-status">🎟 Ticket válido</p>
      </div>

    </div>
  </div>
</div>
  );
};

export default TicketPage;