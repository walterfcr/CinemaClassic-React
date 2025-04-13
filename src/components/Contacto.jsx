import React from 'react';
import './Contacto.css';

const Contacto = () => {
    return (
      <section className="contactoWrap sectionForm py-4">
        <div className="containerForm">
          <h1 className="text-center tituloSeccion5">Contáctenos</h1>
          <form id="form2">
            <div className="formRow">
              <div className="colForm">
                <div className="inputBox">
                  <input id="nombreTxt" type="text" name="name" required />
                  <span className="text">Nombre</span>
                  <span className="line"></span>
                </div>
              </div>
  
              <div className="colForm">
                <div className="inputBox">
                  <input id="apellidoTxt" type="text" name="lastname" required />
                  <span className="text">Apellido</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
  
            <div className="formRow">
              <div className="colForm">
                <div className="inputBox">
                  <input id="emailTxt" type="email" name="email" required />
                  <span className="text">Email</span>
                  <span className="line"></span>
                </div>
              </div>
  
              <div className="colForm">
                <div className="inputBox">
                  <input id="numberTxt" type="number" name="phone" required />
                  <span className="text">Teléfono</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
  
            <div className="formRow">
              <div className="colForm">
                <div className="inputBox textarea">
                  <textarea id="mensajeTxt" name="message" required></textarea>
                  <span className="text">Mensaje</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
  
            <div className="formRow">
              <div className="colForm">
                <p id="mensajeAlert"></p>
                <input id="btnSend" type="button" className="btnWarning" value="Enviar" />
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  };
  
  export default Contacto;