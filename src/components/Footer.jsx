import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Cinema Classic. All rights reserved.</p>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;