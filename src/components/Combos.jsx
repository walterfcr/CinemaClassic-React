import React, { useState } from "react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import './Combos.css';

const Combos = () => {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [imageSrc, setImageSrc] = useState("images/palomita1.webp");

  const flavorImages = {
    "Palomitas con Caramelo": "images/palomita1.webp",
    "Palomitas Cheetos": "images/palomita2.webp",
    "Palomitas Doritos": "images/palomita3.webp",
    "Palomitas Takis": "images/palomita4.webp",
  };

  const prices = {
    "Palomitas con Caramelo": { Unidad: 3000, Combo: 4200 },
    "Palomitas Cheetos": { Unidad: 3500, Combo: 4600 },
    "Palomitas Doritos": { Unidad: 3500, Combo: 4600 },
    "Palomitas Takis": { Unidad: 3600, Combo: 4700 },
  };

  const handleFlavorChange = (e) => {
    const flavor = e.target.value;
    setSelectedFlavor(flavor);
    setImageSrc(flavorImages[flavor]);
  };

  const handlePriceTypeChange = (e) => {
    setSelectedPriceType(e.target.value);
  };

  const calcular = () => {
    if (!selectedFlavor) {
      Swal.fire({
        icon: "info",
        title: "Atención",
        html: '<p class="formatos1">Seleccione el sabor...</p>',
        background: '#fff',
      });
    } else if (!selectedPriceType) {
      Swal.fire({
        icon: "info",
        title: "Atención",
        html: '<p class="formatos1">Seleccione el combo...</p>',
        background: '#fff',
      });
    } else {
      const price = prices[selectedFlavor][selectedPriceType];
      Swal.fire({
        imageUrl: flavorImages[selectedFlavor],
        html: `<p style="color: #000;">${selectedFlavor}<br><br><strong>Precio ${selectedPriceType.toLowerCase()}:</strong></p> ¢${price}`,
        imageWidth: 500,
        imageHeight: 373,
        imageAlt: selectedFlavor,
        background: '#ffffff',
        backdrop: 'rgba(0, 0, 0, 0.7)',
        didOpen: () => {
          const popup = document.querySelector('.swal2-popup');
          if (popup) {
            popup.style.backgroundColor = '#ffffff';
          }
        }
      });
    }
  };

  return (
    <div className="comboColumns">
      <div className="columna">
        <h3>Arma tu combo</h3>
        <h4>Palomitas</h4>
        <select value={selectedFlavor} onChange={handleFlavorChange}>
          <option value="" disabled>Seleccione el sabor:</option>
          {Object.keys(flavorImages).map((flavor) => (
            <option key={flavor} value={flavor}>{flavor}</option>
          ))}
        </select>

        <h4 className="mt-4">Ver Precio</h4>
        <select value={selectedPriceType} onChange={handlePriceTypeChange}>
          <option value="" disabled>Cotización:</option>
          <option>Unidad</option>
          <option>Combo</option>
        </select>

        <div className="mt-3">
          <button className="btn btn-warning" onClick={calcular}>Calcular</button>
        </div>
      </div>

      <div className="columna">
        <img src={imageSrc} alt="palomitas" className="img-fluid" />
      </div>

      <div className="columna">
        <h3>Combos incluyen:</h3>
        <p>Bebida a escoger:</p>
        <ul>
          <li>Gaseosa</li>
          <li>Té frío</li>
        </ul>
        <p>Snack a escoger:</p>
        <ul>
          <li>Barra de chocolate</li>
          <li>m&m's</li>
        </ul>
      </div>
    </div>
  );
};

export default Combos;
