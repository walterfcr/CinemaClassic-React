import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./TicketPage.css";

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
      <div className="ticket-page-card">
        <h2>{ticket.movieTitle}</h2>

        <p><strong>Fecha:</strong> {ticket.date}</p>
        <p><strong>Hora:</strong> {ticket.tanda}</p>
        <p><strong>Cine:</strong> {ticket.cinema}</p>
        <p><strong>Butacas:</strong> {ticket.seats.map(s => s.id).join(", ")}</p>

        <p className="ticket-status">🎟 Ticket válido</p>
      </div>
    </div>
  );
};

export default TicketPage;