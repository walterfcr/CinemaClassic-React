import React from 'react';
import Combos from './Combos';
import './Nosotros.css';

function Dulceria() {
  return (
<main class="twoColumns">
  <h1>Dulcería Cinema Classic</h1>
  <div className="contentWrap">
    <div className="contenedorNosotros">
      <div className="columnaNosotros">
        <div className="cineAnimacion">
          <lottie-player
            src="https://lottie.host/f96ca105-c06a-4c7a-8cf8-9f22ac07c292/IMbdcRgQyJ.json"
            hover
            loop
          ></lottie-player>
        </div>
      </div>
      <div className="columnaNosotros">
        <p>
          Contamos con gran variedad de golosinas, chocolates, refrescos y las infaltables palomitas de maíz y muchos sabores a escoger para mayor disfrute de la película.
        </p>
        <p>
          Tenemos las tradicionales palomitas y también con caramelo, las favoritas de muchos además de muchas novedades como las palomitas Cheetos, con Doritos y para los más valientes las palomitas con Takis
        </p>
        <p>
        Muestra tu entrada VIP y obtendrás gratis un combo a elegir.  Aprovecha las ofertas y combos a tu gusto y así disfrutar del cine de la mejor manera.
        </p>
        <p>
          *No se admite el ingreso de alimentos comprados fuera del local.
        </p>
      </div>
    </div>
  </div>
  <Combos />
</main>

  );
}

export default Dulceria;