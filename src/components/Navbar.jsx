// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  
  const { user, userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  
  const closeSidebar = () => {
    setSidebarOpen(false);
    setDropdownOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeSidebar();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user display name
  const displayName = userData?.name || user?.displayName || user?.email?.split('@')[0] || 'Usuario';
  

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
              <li><Link to="semanal/domingo" onClick={closeSidebar}>Domingo</Link></li>
              <li><Link to="semanal/lunes" onClick={closeSidebar}>Lunes</Link></li>
              <li><Link to="semanal/martes" onClick={closeSidebar}>Martes</Link></li>
              <li><Link to="semanal/miercoles" onClick={closeSidebar}>Miércoles</Link></li>
              <li><Link to="semanal/jueves" onClick={closeSidebar}>Jueves</Link></li>
              <li><Link to="semanal/viernes" onClick={closeSidebar}>Viernes</Link></li>
              <li><Link to="semanal/sabado" onClick={closeSidebar}>Sábado</Link></li>
            </ul>
          </li>
          <li><Link to="/dulceria" onClick={closeSidebar}>Dulcería</Link></li>
          <li><Link to="/contacto" onClick={closeSidebar}>Contacto</Link></li>
          {/* Auth Section */}
          {isAuthenticated ? (
            <li className="user-menu-container" ref={userMenuRef}>
              <button className="user-menu-toggle" onClick={toggleUserMenu}>
                <span className="user-icon">👤</span>
                <span className="user-name">{displayName}</span>
                <span className="user-arrow">▼</span>
              </button>
              <ul className={`dropdown-menu ${userMenuOpen ? 'show' : ''}`}>
                <li><Link to="/mis-boletos" onClick={closeSidebar}>Mis Boletos</Link></li>
                <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </li>
          ) : (
            <li className="auth-links">
              <Link to="/login" onClick={closeSidebar} className="login-btn">
                Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
