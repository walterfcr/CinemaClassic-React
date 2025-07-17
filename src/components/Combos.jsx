import React, { useState } from "react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import './Combos.css'; 

const Combos = () => {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedPriceType, setSelectedPriceType] = useState("");
  const [imageSrc, setImageSrc] = useState("images/palomitas1.jpg");

  const flavorImages = {
    "Palomitas Classic": "images/palomitas1.jpg",
    "Palomitas con Mantequilla": "images/palomitas2.jpg",
    "Palomitas Queso Cheddar": "images/palomitas3.jpg",
    "Palomitas con Caramelo": "images/palomitas4.jpg",
  };

  const prices = {
    "Palomitas Classic": { Unidad: 2000, Combo: 4200 },
    "Palomitas con Mantequilla": { Unidad: 2500, Combo: 4600 },
    "Palomitas Queso Cheddar": { Unidad: 2500, Combo: 4600 },
    "Palomitas con Caramelo": { Unidad: 3600, Combo: 4700 },
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
        customClass: {
          popup: 'custom-swal'
        },
      });
    } else if (!selectedPriceType) {
      Swal.fire({
        icon: "info",
        title: "Atención",
        html: '<p class="formatos1">Seleccione el combo...</p>',
        customClass: {
          popup: 'custom-swal'
        },
      });
    } else {
      const price = prices[selectedFlavor][selectedPriceType];
      Swal.fire({
        imageUrl: flavorImages[selectedFlavor],
        html: `<p style="color: #000;">${selectedFlavor}<br><br><strong>Precio ${selectedPriceType.toLowerCase()}:</strong></p> ¢${price}`,
        imageWidth: 500,
        imageHeight: 373,
        imageAlt: selectedFlavor,
        customClass: {
          popup: 'custom-swal'
        },
        backdrop: 'rgba(0, 0, 0, 0.9)',
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

        <select value={selectedPriceType} onChange={handlePriceTypeChange}>
          <option value="" disabled>Cotización:</option>
          <option>Unidad</option>
          <option>Combo</option>
        </select>
        <div className="mt-3">
          <button className="btnWarning" onClick={calcular}>Calcular</button>
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
        <br />
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
