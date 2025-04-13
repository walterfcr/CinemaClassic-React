import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});

  const toggleSubMenu = (menu) => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <nav>
        <div className="navbar">
          <i
            className={`bx bx-menu ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
          ></i>
          <div className="logo">
            <Link to="/">Cinema Classic</Link>
          </div>
          <div className={`nav-links ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-logo">
              <span className="logo-name">Cinema Classic</span>
              <i className="bx bx-x" onClick={toggleSidebar}></i>
            </div>
            <ul className="links">
              <li><Link to="/">INICIO</Link></li>
              <li><Link to="/nosotros">NOSOTROS</Link></li>
              <li>
                <button onClick={() => toggleSubMenu('htmlcss')} className="submenu-btn">
                  PELICULAS <i className="bx bxs-chevron-down htmlcss-arrow arrow"></i>
                </button>
                <ul className={`htmlCss-sub-menu sub-menu ${isSubMenuOpen.htmlcss ? 'open' : ''}`}>
                  <li><Link to="/domingo">Domingo</Link></li>
                  <li><Link to="/lunes">Lunes</Link></li>
                  <li><Link to="/martes">Martes</Link></li>
                  <li><Link to="/miercoles">Miércoles</Link></li>
                  <li><Link to="/jueves">Jueves</Link></li>
                  <li><Link to="/viernes">Viernes</Link></li>
                  <li><Link to="/sabado">Sábado</Link></li>
                </ul>
              </li>
              <li><Link to="/dulceria">DULCERIA</Link></li>
              <li><Link to="/contacto">CONTACTO</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
