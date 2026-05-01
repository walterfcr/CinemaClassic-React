# 🎬 Cinema Classic React

A **real-time cinema booking system** built with React and Firebase.
This project simulates a production-level movie ticket platform, focusing on **real-time synchronization, concurrency control, and time-based reservation systems**.

---

## 🚀 Live Demo

👉 https://cinema-classic-react.vercel.app/

**Try it yourself:**

* Open the app in two tabs and select the same seats → see real-time blocking
* Reserve seats and wait 5 minutes → they automatically expire
* Buy a ticket → check it in **My Tickets** with QR code

---

## 🧩 Core Features

### 🔥 Real-Time Seat Reservation

* Live seat availability using Firebase Firestore
* Temporary seat locking system (5-minute expiration)
* Conflict prevention using **transactions**
* Multi-user safe booking (no double booking)

---

## 🏗 Architecture Overview

The application follows a modular and scalable structure:

* **Pages** → Route-level views (BuyTicket, MovieDetails, Login)
* **Components** → Reusable UI elements (Navbar, SeatSelectorModal)
* **Hooks** → Encapsulated business logic (useSeatsReservation, useReservationTimer)
* **Services** → Firestore interactions and transactional logic
* **Utils** → Pure helper functions (date formatting, validation)
* **Context** → Global state management (authentication)

This separation ensures:
* Clear responsibility boundaries
* Easier maintenance and scaling
* Improved testability and reusability

### 🎟 Ticketing System

* QR code generated for each ticket
* Tickets stored per user in Firestore
* “My Tickets” dashboard
* Automatic classification:

  * **Upcoming**
  * **Starting Soon** (≤ 30 minutes)
  * **Past / History**

---

### ⏳ Smart Time Handling

* Real-time countdown timer for reservations
* Automatic seat release on expiration
* Disabled past showtimes
* Accurate time-based UI logic (date + time combined)

---

### 🎨 Modern UI / UX

* Dark cinema-style theme
* Responsive layout
* Seat selection modal
* Visual feedback for reservation states
* “Starting Soon” badge for imminent showtimes

---

## 🧠 Technical Challenges Solved

### ⚡ Concurrency Control

Handled multiple users attempting to reserve the same seats using **Firestore transactions**, ensuring data consistency and preventing race conditions.

---

### ⏳ Reservation Expiration System

Implemented a timed reservation mechanism:

* Seats are locked for 5 minutes
* Automatically released if not purchased
* Prevents stale reservations and improves availability

---

### 🔄 Real-Time Synchronization

Used Firestore `onSnapshot` listeners to:

* Sync seat availability across users
* Update countdown timers in real time
* Reflect live reservation changes instantly

---

### 🧮 Time-Based Ticket Logic

Solved edge cases for same-day bookings:

* Combined **date + showtime** instead of just date
* Ensured correct classification (upcoming vs past)
* Added “Starting Soon” detection (≤ 30 min)

---

### 🛠 Architecture Optimization: Dynamic Routing

* **DRY Principle**: Consolidated 7 static pages into 1 reusable component template.
* **Code Reduction**: Reduced UI code footprint by 85% through logic centralization.
* **Data-Driven UI**: Decoupled content from logic using a configuration object for:
  * Daily Banners (custom themes per day)
  * Thematic Descriptions (e.g., "Lunes de Cine Latino")
  * Movie Rotations (dynamic ID mapping)
* **Dynamic Hooks**: Integrated useParams to switch content instantly via URL state (e.g., /semanal/lunes).

---

## 🛠 Tech Stack

* **Frontend:** React
* **Backend / DB:** Firebase Firestore (real-time)
* **Authentication:** Firebase Auth
* **QR Generation:** qrcode library
* **Routing:** React Router
* **Styling:** Custom CSS (dark theme)
* **Hosting:** Vercel

---

## 📸 Key System Behaviors
**These animations demonstrate the core real-time and transactional logic of the application:**

## ⭐ Highlight Feature

## ⚡ Real-Time Seat Synchronization

> Demonstrates concurrent users interacting with the same showtime.
> Seat reservations are instantly reflected across sessions using Firestore real-time listeners.

![Real-time](./assets/gifs/real-time-seat-lock.gif)


## ⏳ Reservation Expiration System

> Seats are temporarily locked and automatically released after a timeout.
> Prevents stale reservations and ensures availability for other users.

![Timer](./assets/gifs/reservation-timer.gif)


## 🎟 Complete Booking Experience

> End-to-end ticket purchase experience:
> selection → reservation → confirmation → QR-based ticket generation.

![Booking Flow](./assets/gifs/booking-flow.gif)

---

## 🚧 Future Improvements

* 💳 Payment integration (Stripe)
* 🔔 Notifications for upcoming movies
* ⚡ Performance optimizations (lazy loading, code splitting)
* 🎬 Enhanced animations and micro-interactions

---

## 💡 What This Project Demonstrates

* Real-time systems with Firebase
* Handling concurrency in frontend applications
* UX design for interactive booking flows
* State management across complex user flows
* Building production-like features without a backend server

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



## 👨‍💻 Author

**Walter Fallas**
🌐 https://walterfallascr.com/
💻 https://github.com/walterfcr

---

## ⭐ Final Note

This project goes beyond a basic CRUD app — it focuses on **real-world challenges like concurrency, timing, and user experience**, making it a strong foundation for scalable applications.


## 📄 License

This project is for educational and portfolio purposes.



