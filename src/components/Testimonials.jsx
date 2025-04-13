import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Testimonials.css';


const Testimonials = () => {
    const options = {
      loop: true,
      margin: 10,
      nav: false,
      dots: true,
      autoplay: true,
      responsive: {
        0: { items: 1 },
        600: { items: 3 },
        1000: { items: 3 }
      }
    };
  
    return (
      <section className="comentarios">
        <h2>Algunos comentarios de nuestros clientes</h2>
        <div className="testimonials_container">
          <OwlCarousel className="owl-theme" {...options}>
            <div className="item">
              <img src="images/usuario1.webp" alt="" />
              <h3>Jordi Chavez</h3>
              <p>Me gustó mucho el lugar, altamente recomendado.</p>
              {Array(5).fill(0).map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#c17f27' }}></i>
              ))}
            </div>
            <div className="item">
              <img src="images/usuario2.webp" alt="" />
              <h3>Patricia Quiros</h3>
              <p>Butacas cómodas y bastante variedad en películas.</p>
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#c17f27' }}></i>
              ))}
              <i className="fa-solid fa-star-half-stroke" style={{ color: '#c17f27' }}></i>
            </div>
            <div className="item">
              <img src="images/usuario3.webp" alt="" />
              <h3>Silvia Perez</h3>
              <p>Una nueva manera de disfrutar el cine, encantada.</p>
              {Array(5).fill(0).map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#c17f27' }}></i>
              ))}
            </div>
            <div className="item">
              <img src="images/usuario4.webp" alt="" />
              <h3>Luis Torrente</h3>
              <p>Me gustó las palomitas y amplia variedad de dulces.</p>
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#c17f27' }}></i>
              ))}
              <i className="fa-regular fa-star" style={{ color: '#c17f27' }}></i>
            </div>
            <div className="item">
              <img src="images/usuario5.webp" alt="" />
              <h3>Kendra Michaels</h3>
              <p>Me gustó el lugar muy tranquilo, cómodo y cerca.</p>
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fa-solid fa-star" style={{ color: '#c17f27' }}></i>
              ))}
              <i className="fa-solid fa-star-half-stroke" style={{ color: '#c17f27' }}></i>
            </div>
          </OwlCarousel>
        </div>
      </section>
    );
  };
  
  export default Testimonials;