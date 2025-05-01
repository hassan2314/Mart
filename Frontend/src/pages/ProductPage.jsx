import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/Products/ProductList";
import Cart from "../components/Products/Cart";

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/`);
        setProducts(res.data.data); // Adjust if API format differs
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + (product.qty || 1) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: product.qty || 1 }]);
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
    <div className="w-full overflow-x-hidden">
      <div className="bg-gray-50 min-h-screen">
        <h1 className="md:text-3xl text-2xl font-bold my-6 text-red-600 text-center">
          Our Products
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 px-4">
          <ProductList products={products} onAddToCart={addToCart} />
          <Cart cart={cart} onRemove={removeFromCart} onBuyNow={buyNow} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
