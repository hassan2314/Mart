import axios from 'axios';
import React,  { useEffect, useState } from 'react';

const Product = () => {
    //  const slides =
    // [
    //     { image: "/bakistry.png", title: "Whole Chicken, Designer Cuts" },
    //     { image: "/breadedselection.png", title: "Breaded Selection" },
    //     { image: "/deline.png", title: "Kabab Temptations" },
    //     { image: "/kababtemptations.png", title: "Deline" },
    //     { image: "/premiumchicken.png", title: "Topping & Fillingz" },
    //     { image: "/samosa.png", title: "Signature Samosas and Spring Roll" },
    //     { image: "/stok.png", title: "Bakistry" },
    //     { image: "/tnf.png", title: "Stok" },
    //   ];
    const [slides, setSlides] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/`);
          setSlides(res.data.data); // Assuming API response structure is { success, message, data }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, []);
  return (
  
    <div className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">Consumer Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* {[
          { src: "./bakistry.png", title: "Whole Chicken, Designer Cuts" },
          { src: "./breadedselection.png", title: "Breaded Selection" },
          { src: "./deline.png", title: "Kabab Temptations" },
          { src: "./kababtemptations.png", title: "Deline" },
          { src: "./premiumchicken.png", title: "Topping & Fillingz" },
          { src: "./samosa.png", title: "Signature Samosas and Spring Roll" },
          { src: "./stok.png", title: "Bakistry" },
          { src: "./tnf.png", title: "Stok" },
        ] */}
        {slides.map((item, idx) => (
          <div key={idx} className="text-center cursor-pointer hover:scale-105 transition-transform">
            <img src={item.image} alt={item.title} className="mx-auto w-40 md:w-48" />
            <p className="mt-2 text-lg font-semibold text-red-600">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
            <a href="./products" class="text-red-600 font-bold text-lg">See more{' >'}</a>
        </div>
    </div>
      
        
  );
};

export default Product;
