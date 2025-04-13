import React from 'react';
import OwlCarousel from "react-owl-carousel";
import './Proximamente.css';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


  /*  <main>
        <div className='proximamente'>
        <h2>Próximas Películas</h2>
        <p>Estas son algunas de las películas que proyectaremos el próximo mes, solicitadas por nuestros clientes</p>
        </div>
    </main>
    */
    const Proximamente = () => {
        const carouselOptions = {
          items: 4,
          lazyLoad: true,
          autoplay: true,
          nav: true,
          navText: ["", ""],
          rewind: true,
          dots: false,
        };
      
        const movies = [
          { src: "images/prox1.webp", title: "Fight Club" },
          { src: "images/prox2.webp", title: "Rock N Rolla." },
          { src: "images/prox3.webp", title: "Close" },
          { src: "images/prox4.webp", title: "Spirited Away" },
          { src: "images/prox5.webp", title: "SLC Punk" },
          { src: "images/prox6.webp", title: "Clerks" },
          { src: "images/prox7.webp", title: "Yojimbo" },
          { src: "images/prox8.webp", title: "Memento" },
          { src: "images/prox9.webp", title: "Shoplifters" },
          { src: "images/prox10.webp", title: "Eraserhead" },
        ];
      
        return (
        <main>
        <div className='proximamente'>
        <h2>Próximas Películas</h2>
        <p>Estas son algunas de las películas que proyectaremos el próximo mes, solicitadas por nuestros clientes</p>
        </div>
          <div className='carouselContainer'>
            <OwlCarousel className="owl-theme" {...carouselOptions}>
              {movies.map((movie, index) => (
                <div key={index} className="item2">
                  <img
                    className="img-fluid"
                    src={movie.src}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </OwlCarousel>
          </div>
          </main>
        );
      };
      
      export default Proximamente;