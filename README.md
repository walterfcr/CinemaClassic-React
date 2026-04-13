# 🎬 Cinema Classic React

A modern cinema booking web application built with React and Firebase.
This project simulates a real-world movie theater experience, including seat selection, ticket purchasing, and QR-based digital tickets.

---

## 🚀 Live Demo

👉 https://cinema-classic-react.vercel.app/

---

## 🧩 Features

### 🎥 Movie Experience

* Weekly themed movies (cult/classic style)
* Featured films section
* Interactive hero slider
* Movie detail pages with trailer

### 🎟 Ticket Booking System

* User authentication (Firebase Auth)
* Select cinema, date, and time
* Interactive seat selection
* Real-time seat availability
* Price calculation (Regular / VIP)

### 🧾 Purchase Flow

* Reservation summary before purchase
* Ticket confirmation system
* Persistent ticket storage in Firebase

### 📱 Digital Tickets

* Unique QR code generated per ticket
* Tickets stored in user account
* “My Tickets” page with:

  * Upcoming tickets
  * Past tickets history

### 📱 Responsive Design

* Fully responsive (mobile, tablet, desktop)

---

## 🛠 Tech Stack

* **Frontend:** React, React Router
* **Backend / DB:** Firebase (Firestore)
* **Authentication:** Firebase Auth
* **QR Codes:** qrcode library
* **Hosting:** Vercel

---

## 📂 Project Structure (Simplified)

src/
├── components/
│ ├── BuyTicket.jsx
│ ├── SeatSelectorModal.jsx
│ ├── MyTickets.jsx
│ └── ...
├── context/
│ └── AuthContext.jsx
├── firebase.js
├── moviesData.js

---

## 🔐 Firebase Features

* User authentication (login/signup)
* Firestore database:

  * Users collection
  * Tickets collection
  * Showtimes (seat availability)

---

## 🎯 Key Functionalities

* Prevents double booking of seats
* Stores purchased tickets per user
* Generates QR codes for each ticket
* Separates upcoming and past tickets
* Clean and reusable component structure

---

## 📸 Screenshots (Optional)

*Add screenshots here to showcase UI*

---

## ⚙️ Installation

```bash
git clone https://github.com/walterfcr/CinemaClassic-React.git
cd CinemaClassic-React
npm install
npm run dev
```


=======
🔑 Environment Variables

Create a .env file in the root of the project and add your Firebase configuration:

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...


---

## 🔑 Environment Setup

Create a Firebase project and add your config in:

```
src/firebase.js
```

---

## 📈 Future Improvements

* QR code scanner for ticket validation
* Admin dashboard
* Seat reservation timeout system
* Payment integration (Stripe)
* Better UI/UX animations

---

## 👨‍💻 Author

Walter Fallas Barrantes

---

## 📄 License

This project is for educational and portfolio purposes.



