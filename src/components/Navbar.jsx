// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeSidebar = () => {
    setSidebarOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/" onClick={closeSidebar}><span className='logo-dec1'>Cinema</span> <span className='logo-dec2'>Classic</span></Link>
        </div>
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <ul className={`nav-links ${sidebarOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeSidebar}>Inicio</Link></li>
          <li><Link to="/nosotros" onClick={closeSidebar}>Nosotros</Link></li>
          <li className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              Películas ▼
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <li><Link to="/domingo" onClick={closeSidebar}>Domingo</Link></li>
              <li><Link to="/lunes" onClick={closeSidebar}>Lunes</Link></li>
              <li><Link to="/martes" onClick={closeSidebar}>Martes</Link></li>
              <li><Link to="/miercoles" onClick={closeSidebar}>Miércoles</Link></li>
              <li><Link to="/jueves" onClick={closeSidebar}>Jueves</Link></li>
              <li><Link to="/viernes" onClick={closeSidebar}>Viernes</Link></li>
              <li><Link to="/sabado" onClick={closeSidebar}>Sábado</Link></li>
            </ul>
          </li>
          <li><Link to="/dulceria" onClick={closeSidebar}>Dulcería</Link></li>
          <li><Link to="/contacto" onClick={closeSidebar}>Contacto</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;