import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  });

  const [mensajeAlert, setMensajeAlert] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    const { name, lastname, email, phone, message } = formData;

    if (!name || !lastname || !email || !phone || !message) {
      setMensajeAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setMensajeAlert('Por favor, ingrese un correo válido.');
      return;
    }

    if (!/^\d{8,}$/.test(phone)) {
      setMensajeAlert('El teléfono debe tener al menos 8 dígitos.');
      return;
    }

    // Aquí podrías enviar los datos a una API o backend
    setMensajeAlert('¡Mensaje enviado con éxito!');

    // Limpia el formulario
    setFormData({
      name: '',
      lastname: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="contactoWrap sectionForm py-4">
      <div className="containerForm">
        <h1 className="text-center tituloSeccion5">Contáctenos</h1>
        <form id="form2" onSubmit={(e) => e.preventDefault()}>
          <div className="formRow">
            <div className="colForm">
              <div className="inputBox">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span className="text">Nombre</span>
                <span className="line"></span>
              </div>
            </div>

            <div className="colForm">
              <div className="inputBox">
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
                <span className="text">Apellido</span>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="formRow">
            <div className="colForm">
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="text">Email</span>
                <span className="line"></span>
              </div>
            </div>

            <div className="colForm">
              <div className="inputBox">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <span className="text">Teléfono</span>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="formRow">
            <div className="colForm">
              <div className="inputBox textarea">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <span className="text">Mensaje</span>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="formRow">
            <div className="colForm">
              <p id="mensajeAlert" style={{ color: mensajeAlert.includes('éxito') ? 'green' : 'red' }}>
                {mensajeAlert}
              </p>
              <input
                type="button"
                className="btnWarning"
                value="Enviar"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
