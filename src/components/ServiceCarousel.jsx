import React, { useState, useEffect } from "react";

export default function ServiceCarousel() {
  const images = [
    "/images/sevicephotos/01.png",
    "/images/sevicephotos/02.png",
    "/images/sevicephotos/03.png",
    "/images/sevicephotos/04.png",
    "/images/sevicephotos/05.png",
    "/images/sevicephotos/06.png",
    "/images/sevicephotos/07.png",
    "/images/sevicephotos/08.png",
    "/images/sevicephotos/09.png",
    "/images/sevicephotos/10.png",
    "/images/sevicephotos/11.png",
    "/images/sevicephotos/12.png",
    "/images/sevicephotos/13.png",
    "/images/sevicephotos/14.png",
    "/images/sevicephotos/15.png",
    "/images/sevicephotos/16.png",
    "/images/sevicephotos/17.png",
    "/images/sevicephotos/18.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
}, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-auto object-cover">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex shrink-0 w-auto">
            <img
              src={src}
              alt={`Service photo ${index + 1}`}
              className="w-auto object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
