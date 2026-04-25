import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import './MyTickets.css';

export default function MyTickets() {
  const { user, userData, loading: authLoading } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    const fetchTickets = async () => {
      if (!user) {
        setTickets([]);
        setLoading(false);
        return;
      }

      try {
        const ticketsRef = collection(db, 'tickets');
        const q = query(
          ticketsRef,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);

        const ticketsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));

        setTickets(ticketsList);

      } catch (err) {
        console.error(err);
        setError('Error al cargar tus boletos');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, authLoading]);

  // 🔥 FIXED: Date + Time logic
  const getShowDateTime = (ticket) => {
    if (!ticket.date || !ticket.tanda) return null;
    return new Date(`${ticket.date}T${ticket.tanda}:00`);
  };

  const isUpcoming = (ticket) => {
    const showDate = getShowDateTime(ticket);
    if (!showDate) return false;
    return showDate > new Date();
  };

  // 🔥 NEW: Status logic (Netflix-style)
  const getTicketStatus = (ticket) => {
    const showDate = getShowDateTime(ticket);
    if (!showDate) return "past";

    const now = new Date();
    const diffMinutes = (showDate - now) / (1000 * 60);

    if (diffMinutes <= 0) return "past";
    if (diffMinutes <= 30) return "starting";
    return "upcoming";
  };

  if (authLoading) {
    return (
      <div className="mytickets-page">
        <div className="mytickets-loading">
          <div className="mytickets-spinner"></div>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mytickets-page">
        <div className="mytickets-loading">
          <div className="mytickets-spinner"></div>
          <p>Cargando tus boletos...</p>
        </div>
      </div>
    );
  }

  const upcomingTickets = tickets.filter(t => isUpcoming(t));
  const pastTickets = tickets.filter(t => !isUpcoming(t));

  return (
    <div className="mytickets-page">
      <div className="mytickets-container">

        <div className="mytickets-header">
          <h1>Mis Boletos</h1>
          <p>Bienvenido, {userData?.name || user?.displayName || 'Usuario'}</p>
        </div>

        {error && <div className="mytickets-error">{error}</div>}

        {tickets.length === 0 ? (
          <div className="mytickets-empty">
            <div className="empty-icon">🎬</div>
            <h2>No tienes boletos aún</h2>
            <p>Explora nuestras películas y reserva tus entradas.</p>
            <Link to="/" className="mytickets-cta">
              Ver Cartelera
            </Link>
          </div>
        ) : (
          <>
            {/* 🎬 UPCOMING */}
            {upcomingTickets.length > 0 && (
              <section className="tickets-section">
                <h2 className="section-title">Próximas Funciones</h2>
                <div className="tickets-grid">
                  {upcomingTickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} getTicketStatus={getTicketStatus} />
                  ))}
                </div>
              </section>
            )}

            {/* 📜 HISTORY */}
            {pastTickets.length > 0 && (
              <section className="tickets-section">
                <h2 className="section-title">📜 Historial</h2>
                <div className="tickets-grid">
                  {pastTickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} getTicketStatus={getTicketStatus} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ===============================
// 🎟 Ticket Card
// ===============================
function TicketCard({ ticket, getTicketStatus }) {

  const formatTicketDate = (dateStr) => {
    if (!dateStr) return 'N/A';

    const date = new Date(dateStr + 'T00:00:00');

    return new Intl.DateTimeFormat('es-CR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const status = getTicketStatus(ticket);

  return (
    <div className={`ticket-card ${status}`}>

      {/* IMAGE */}
      <div className="ticket-top">
        <div className="ticket-image">
          {ticket.movieBanner ? (
            <img src={ticket.movieBanner} alt={ticket.movieTitle} />
          ) : (
            <div className="ticket-placeholder">🎬</div>
          )}

          {/* 🔥 NEW BADGE */}
          <span className={`ticket-badge ${status}`}>
            {status === "starting" && "🎬 Empieza pronto"}
            {status === "upcoming" && "🟢 Próxima"}
            {status === "past" && "Finalizada"}
          </span>
        </div>

        {/* DETAILS */}
        <div className="ticket-details">
          <h3 className="ticket-title">{ticket.movieTitle}</h3>

          <div className="ticket-info">
            <div className="info-row">📅 {formatTicketDate(ticket.date)}</div>
            <div className="info-row">🕐 {ticket.tanda}</div>
            <div className="info-row">📍 {ticket.cinema}</div>
            <div className="info-row">
              💺 {ticket.seats?.map(s => s.id).join(', ') || 'N/A'}
            </div>
          </div>

          {/* QR */}
          {ticket.qrImage && (
            <div className="ticket-qr">
              <img src={ticket.qrImage} alt="QR Code" />
            </div>
          )}

          {/* FOOTER */}
          <div className="ticket-footer">
            <span className="ticket-total">
              Total: ¢{ticket.total?.toLocaleString()}
            </span>

            {ticket.createdAt && (
              <span className="ticket-purchased">
                Comprado:{' '}
                {new Intl.DateTimeFormat('es-CR', {
                  month: 'short',
                  day: 'numeric'
                }).format(ticket.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}