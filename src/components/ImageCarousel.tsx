import React, { useState, useEffect } from "react";

// Agrega aquí tus imágenes
import img1 from "../assets/carruselLogin1.jpeg";
import img2 from "../assets/carruselLogin2.jpeg";
import img3 from "../assets/carruselLogin3.jpeg";
import img4 from "../assets/carruselLogin4.jpeg";

const images = [img1, img2, img3, img4];

export function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ aspectRatio: '3/3', maxHeight: '100%', maxWidth: '100%' }}
      >
        <img
          src={images[current]}
          alt={`Carrusel ${current + 1}`}
          className="object-cover w-full h-full rounded-2xl shadow-lg"
          style={{ aspectRatio: '2/3', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
