import { 
  doc, 
  runTransaction, 
  serverTimestamp, 
  collection, 
  addDoc, 
  setDoc 
} from "firebase/firestore";
import { db } from "../firebase";
import QRCode from "qrcode";

export const reserveSeatsService = async ({
  movie,
  form,
  selectedSeats,
  user
}) => {
  const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
  const showtimeRef = doc(db, "showtimes", showtimeId);

  const selectedIds = selectedSeats.map(s => s.id);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(showtimeRef);
    const data = snap.exists() ? snap.data() : {};

    const occupied = data.occupiedSeats || [];
    const reserved = data.reservedSeats || [];

    const now = Date.now();

    const validReserved = reserved.filter(r => r.expiresAt > now);

    const conflict = selectedIds.some(id =>
      occupied.includes(id) ||
      validReserved.some(r => r.seatId === id)
    );

    if (conflict) {
      throw new Error("Seats not available");
    }

    const newReservations = selectedIds.map(id => ({
      seatId: id,
      userId: user.uid,
      expiresAt: now + 5 * 60 * 1000
    }));

    transaction.set(showtimeRef, {
      ...data,
      reservedSeats: [...validReserved, ...newReservations]
    });
  });
};

export const releaseSeatsService = async ({
  movie,
  form,
  selectedSeats,
  user
}) => {
  if (!user) return;

  const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
  const showtimeRef = doc(db, "showtimes", showtimeId);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(showtimeRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const reserved = data.reservedSeats || [];

    const selectedIds = selectedSeats.map(s => s.id);

    const updatedReserved = reserved.filter(r =>
      !(r.userId === user.uid && selectedIds.includes(r.seatId))
    );

    transaction.set(showtimeRef, {
      ...data,
      reservedSeats: updatedReserved
    });
  });
};

export const confirmPurchaseService = async ({
  movie,
  form,
  selectedSeats,
  user,
  totalPrice
}) => {
  const showtimeId = `${movie.id}_${form.date}_${form.tanda}_${form.cinema}`;
  const showtimeRef = doc(db, "showtimes", showtimeId);

  const selectedIds = selectedSeats.map(s => s.id);

  // 🔥 TRANSACTION (seat validation + purchase)
  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(showtimeRef);
    const data = snap.exists() ? snap.data() : {};

    const occupied = data.occupiedSeats || [];
    const reserved = data.reservedSeats || [];

    const now = Date.now();

    const validUserSeats = reserved.filter(r =>
      r.userId === user.uid &&
      selectedIds.includes(r.seatId) &&
      r.expiresAt > now
    );

    if (validUserSeats.length !== selectedIds.length) {
      throw new Error("Reservation expired");
    }

    const expired = validUserSeats.some(r => r.expiresAt <= now);
    if (expired) throw new Error("Reservation expired");

    const mySeatIds = validUserSeats.map(s => s.seatId);

    const conflict = mySeatIds.some(id => occupied.includes(id));
    if (conflict) throw new Error("Seats taken");

    const remainingReserved = reserved.filter(r =>
      !(r.userId === user.uid && mySeatIds.includes(r.seatId))
    );

    transaction.set(showtimeRef, {
      ...data,
      occupiedSeats: [...occupied, ...mySeatIds],
      reservedSeats: remainingReserved,
      updatedAt: serverTimestamp()
    });
  });

  // 🎟️ CREATE TICKET
  const ticketRef = await addDoc(collection(db, "tickets"), {
    userId: user.uid,
    userEmail: user.email,
    movieId: movie.id,
    movieTitle: movie.title,
    movieBanner: movie.banner,
    ...form,
    seats: selectedSeats,
    total: totalPrice,
    createdAt: serverTimestamp(),
  });

  // 🔳 GENERATE QR
  const qrValue = `https://cinema-classic-react.vercel.app/ticket/${ticketRef.id}`;
  const qrImage = await QRCode.toDataURL(qrValue);

  await setDoc(ticketRef, { qrValue, qrImage }, { merge: true });

  return ticketRef.id;
};