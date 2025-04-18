import React, { useEffect, useRef } from 'react';
import Testimonials from './Testimonials';
import './Nosotros.css';


function Nosotros() {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    // Show default logo on load
    if (imageRef.current) {
      imageRef.current.innerHTML = "<img src='images/logo-cines.webp' class='img-fluid' alt='logo' />";
    }

    const handleChange = (e) => {
      const n = e.target.value;

      const imagen = `<img src='images/combo/${n}.webp' class='img-fluid' alt='cines' />`;

      const titulo = [
        "<h2>Cinema Classic - San José</h2>",
        "<h2>Cinema Classic - Heredia</h2>",
        "<h2>Cinema Classic - Cartago</h2>",
      ];

      const text = [
        "<p>Barrio la California</p>",
        "<p>En el Mall Oxígeno, San Francisco de Heredia</p>",
        "<p>Mall Paseo Metrópoli, Provincia de Cartago</p>",
      ];

      if (titleRef.current && imageRef.current && textRef.current) {
        titleRef.current.innerHTML = titulo[n - 1];
        imageRef.current.innerHTML = imagen;
        textRef.current.innerHTML = text[n - 1];
      }
    };

    const handleReset = () => {
      if (titleRef.current && imageRef.current && textRef.current && selectRef.current) {
        titleRef.current.innerHTML = '';
        imageRef.current.innerHTML = "<img src='images/logo-cines.webp' class='img-fluid' alt='logo' />";
        textRef.current.innerHTML = '';
        selectRef.current.value = '';
      }
    };

    const select = selectRef.current;
    const resetBtn = document.getElementById('btn-clean');

    if (select) select.addEventListener('change', handleChange);
    if (resetBtn) resetBtn.addEventListener('click', handleReset);

    return () => {
      if (select) select.removeEventListener('change', handleChange);
      if (resetBtn) resetBtn.removeEventListener('click', handleReset);
    };
  }, []);

  return (
    <main class="twoColumns">
      <h1>Acerca de Cinema Classic</h1>
      <div className="contentWrap">
        <div className="contenedorNosotros">
          <div className="columnaNosotros">
            <div className="cineAnimacion">
              <lottie-player
                src="https://lottie.host/79070bba-58cf-4860-8b16-f2d7d68d7077/cr6trRjjxl.json"
                hover
                loop
              ></lottie-player>
            </div>
          </div>
          <div className="columnaNosotros">
            <p>
              Cinema Classic es una nueva iniciativa de disfrutar el cine, ya sea películas en estreno o películas clásicas o como a los cinéfilos nos gusta referirnos, películas de culto. Si alguna vez has visto una película pero nunca pudiste verla en el cine, esta es tu oportunidad. Contamos con una temática diferente por cada día de la semana para que haya más variedad.
            </p>
            <p>
              Brindamos también la posibilidad de que nuestros clientes elijan o nos recomienden alguna película, tenemos un amplio catálogo internacional.
            </p>
            <p>
              Todas nuestras salas de cine cuentan con tecnología 100% digital.
            </p>
            <p>
              Si eres amante del cine, comercial o independiente, clásicos, extranjeras o simplemente quieres pasar un buen rato, Cinema Classic es el mejor lugar.
            </p>
          </div>
        </div>

        <div className="contenedorNosotros"> 
          <div className="columnaNosotros">
            <h2>Conozca Nuestros Cines</h2>
            <p>
              Nuestros 3 cines están ubicadas en los lugares más céntricos del Valle Central. Con buena ubicación y seguridad, amplio parqueo y fácil acceso. <br /><br /> Contamos con lo más moderno en proyección con butacas cómodas y de buena calidad. Nuestra dulcería es famosa por su variedad en golosinas y palomitas así como el buen servicio que brindamos. Compruebe la calidad de nuestro cine y déjanos tu comentario en nuestras redes sociales.
            </p>
            <p>Les mostramos nuestros cines y su ubicación</p>
            <div className="">
              <div>
                <select className="form-select" id="cines" ref={selectRef}>
                  <option value="" disabled selected>
                    Seleccione un cine
                  </option>
                  <option value="1">San José</option>
                  <option value="2">Heredia</option>
                  <option value="3">Cartago</option>
                </select>
              </div>
              <div>
                <button >Reiniciar</button>
              </div>
            </div>
          </div>

          <div className="columnaNosotros">
            <div className="d-flex" id="output-img" ref={imageRef}></div>
            <div id="output-title" ref={titleRef}></div>
            <div id="output-text" ref={textRef}></div>
          </div>
        </div>




      </div>
      <Testimonials />
    </main>
  );
}

export default Nosotros;