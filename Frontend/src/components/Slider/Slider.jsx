import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Beautiful thin arrows

const Slider = () => {
  const slides = [
    { image: "/bakistry.png", title: "Whole Chicken, Designer Cuts" },
    { image: "/breadedselection.png", title: "Breaded Selection" },
    { image: "/deline.png", title: "Kabab Temptations" },
    { image: "/kababtemptations.png", title: "Deline" },
    { image: "/premiumchicken.png", title: "Topping & Fillingz" },
    { image: "/samosa.png", title: "Signature Samosas and Spring Roll" },
    { image: "/stok.png", title: "Bakistry" },
    { image: "/tnf.png", title: "Stok" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-white min-h-[400px]">
        {/* Left Text Content */}
        <div className="md:w-1/3 text-left">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-red-600 leading-tight">
            Make Better Taste <br /> Of Your Food <br />
            <span className="italic text-gray-500">with us</span>
          </h1>
        </div>

        {/* Slider Section */}
        <div className="md:w-2/3 relative">
          <div className="relative w-full max-w-lg mx-auto mt-10 overflow-hidden">
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full min-w-full flex flex-col items-center"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-48 md:w-64 rounded-lg"
                  />
                  <p className="mt-2 text-xl font-semibold text-red-600">
                    {slide.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons with Beautiful Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:text-red-600 hover:bg-gray-200 p-2 rounded-full shadow-lg transition duration-300"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:text-red-600 hover:bg-gray-200 p-2 rounded-full shadow-lg transition duration-300"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dots Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-red-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;
