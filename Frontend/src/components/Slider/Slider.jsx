import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/`);
        setSlides(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [slides.length, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-12 bg-white min-h-[400px]">
      {/* Text Content */}
      <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 leading-tight">
          Make Better Taste <br /> Of Your Food <br />
          <span className="italic text-gray-500">with us</span>
        </h1>
      </div>

      {/* Slider Container */}
      <div className="w-full md:w-2/3 relative">
        <div className="relative w-full max-w-lg mx-auto mt-10 overflow-hidden">
          {/* Slides Track */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-full min-w-full flex-shrink-0 flex justify-center px-2"
              >
                <Link to="/products" className="block w-full max-w-xs">
                  <div className="flex flex-col items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-48 md:h-56 object-contain rounded-lg "
                    />
                    <p className="mt-3 text-lg font-semibold text-red-600 text-center">
                      {slide.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-600 w-3.5" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Slider;