import React from 'react';
import './Vip.css';

function Vip() {
  return (
    <main>
        <div className='vipContainer'>
            <div className='vipColumn'>
                 <img src="images/logo.png" alt="Monday Movie 1" />
            </div>
            <div className='vipColumn'>
                <h2>Zona VIP</h2>
                <hr />
                <p>En VIP tendrás mejor visibilidad para disfrutar tus películas además disfrutarás de un combo de palomitas grandes y bebida.</p>
                <p>Disponible en todas las salas</p>
                <p>Espacios Limitados</p>
                <p>Valor de la entrada ¢4500 + cargos</p>
            </div>
        </div>
    </main>
  );
}

export default Vip;