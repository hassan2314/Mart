import React, { useState } from "react";
import ProductList from "../components/Products/ProductList";
import Cart from "../components/Products/Cart";

const ProductPage = () => {
  const [cart, setCart] = useState([]);

  // Static data for now
  const products = [
    { id: 1, name: "Whole Chicken", price: 12.99, image: "/bakistry.png" },
    {
      id: 2,
      name: "Breaded Selection",
      price: 9.99,
      image: "/breadedselection.png",
    },
    { id: 3, name: "Kabab Temptations", price: 14.99, image: "/deline.png" },
    {
      id: 4,
      name: "Premium Chicken",
      price: 14.99,
      image: "/premiumchicken.png",
    },
    { id: 5, name: "Samosa", price: 14.99, image: "/samosa.png" },
    { id: 6, name: "Stok", price: 14.99, image: "/stok.png" },
    { id: 7, name: "TnF", price: 14.99, image: "/tnf.png" },
  ];

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + product.qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const buyNow = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Redirecting to checkout...");
    setCart([]);
  };

  return (
    <>
    <div className="w-full overflow-x-hidden">
  {/* Page content here */}


      <div className="bg-gray-50 min-h-screen">
        <h1 className="md:text-3xl text-2xl font-bold my-6 text-red-600 text-center">
          Our Products
        </h1>
        {/* <div className="max-w-6xl mx-auto py-10 flex space-x-6">
          {/* Passing static data to ProductList */}
        {/* <ProductList products={products} onAddToCart={addToCart} /> */}
        {/* <Cart cart={cart} onRemove={removeFromCart} onBuyNow={buyNow} /> */}
        {/* </div>  */}
        <div className="flex flex-col lg:flex-row gap-6 px-4">
          <ProductList products={products} onAddToCart={addToCart} />
          <Cart cart={cart} onRemove={removeFromCart} onBuyNow={buyNow} />
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductPage;
