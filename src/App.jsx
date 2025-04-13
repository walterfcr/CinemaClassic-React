import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
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
import Content from './components/Content';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';
import './App.css';
import './responsive.css';

function App() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Navbar />

      {/* Main Routes (backgroundLocation is used if navigating from a modal-triggering link) */}
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={
          <>
            <Slider />
            <Content />
          </>
        } />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/domingo" element={<Domingo />} />
        <Route path="/lunes" element={<Lunes />} />
        <Route path="/martes" element={<Martes />} />
        <Route path="/miercoles" element={<Miercoles />} />
        <Route path="/jueves" element={<Jueves />} />
        <Route path="/viernes" element={<Viernes />} />
        <Route path="/sabado" element={<Sabado />} />
      </Routes>

      {/* Conditional modal rendering for movie details */}
      <AnimatePresence>
        {backgroundLocation && (
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
