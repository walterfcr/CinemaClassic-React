import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Nosotros from './components/Nosotros';
import Domingo from './components/Domingo';
import Lunes from './components/Lunes';
import Martes from './components/Martes';
import Miercoles from './components/Miercoles';
import Jueves from './components/jueves';
import Viernes from './components/Viernes';
import Sabado from './components/sabado';
import Dulceria from './components/Dulceria';
import Slider from './components/Slider';
import Contacto from './components/Contacto';
import Content from './components/Content';
import Footer from './components/Footer';
import MovieDetails from './pages/MovieDetails';
import BuyTicket from "./pages/BuyTicket";
import Login from './pages/Login';
import Register from './pages/Register';
import MyTickets from './pages/MyTickets';
import './App.css';
import './responsive.css';

function App() {
  const location = useLocation();
  const state = location.state;

  // backgroundLocation para modal padre
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Navbar />

      {/* Main Routes */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<><Slider /><Content /></>} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/domingo" element={<Domingo />} />
        <Route path="/lunes" element={<Lunes />} />
        <Route path="/martes" element={<Martes />} />
        <Route path="/miercoles" element={<Miercoles />} />
        <Route path="/jueves" element={<Jueves />} />
        <Route path="/viernes" element={<Viernes />} />
        <Route path="/sabado" element={<Sabado />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/mis-boletos" element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        } />
      </Routes>

      {/* Modales */}
      <AnimatePresence>
        {/* MovieDetails modal */}
        {location.pathname.startsWith("/movie/") && (
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        )}

        {/* BuyTicket modal - Protected */}
        {location.pathname.startsWith("/buy/") && (
          <Routes>
            <Route path="/buy/:id" element={
              <ProtectedRoute>
                <BuyTicket />
              </ProtectedRoute>
            } />
          </Routes>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}


export default App;
