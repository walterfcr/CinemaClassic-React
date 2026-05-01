import { useState, useEffect } from "react";
import { reserveSeatsService, releaseSeatsService } from "../services/showtimeService";

export const useSeatsReservation = ({
  movie,
  form,
  user
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reserved, setReserved] = useState(false);

  // 🎟️ reserve
  const reserveSeats = async () => {
    if (!user) {
      throw new Error("NOT_AUTH");
    }

    await reserveSeatsService({
      movie,
      form,
      selectedSeats,
      user
    });

    setReserved(true);
  };

  // 🧹 release
  const releaseSeats = async () => {
    if (!user) return;

    await releaseSeatsService({
      movie,
      form,
      selectedSeats,
      user
    });

    setReserved(false);
    setSelectedSeats([]);
  };

  // 🔄 reset when showtime changes
  useEffect(() => {
    setSelectedSeats([]);
    setReserved(false);
  }, [form.date, form.tanda, form.cinema]);

  return {
    selectedSeats,
    setSelectedSeats,
    reserved,
    reserveSeats,
    releaseSeats
  };
};