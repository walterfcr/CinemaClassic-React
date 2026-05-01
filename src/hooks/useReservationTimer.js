import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const useReservationTimer = ({
  reserved,
  user,
  movie,
  form,
  selectedSeats,
  submitted
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!reserved || !user) return;

    const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
    const ref = doc(db, "showtimes", showtimeId);

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      const reservedSeats = data.reservedSeats || [];

      const selectedIds = selectedSeats.map(s => s.id);

      const myReservations = reservedSeats.filter(r =>
        r.userId === user.uid &&
        selectedIds.includes(r.seatId)
      );

      if (myReservations.length === 0) {
        if (submitted) setTimeLeft(0);
        return;
      }

      const expiresAt = myReservations[0].expiresAt;

      const updateTimer = () => {
        const diff = expiresAt - Date.now();
        setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
      };

      updateTimer();

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(updateTimer, 1000);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reserved, user, movie.id, form.date, form.tanda, form.cinema, selectedSeats, submitted]);

  return timeLeft;
};