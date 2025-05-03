import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/Products/ProductList";
import Cart from "../components/Products/Cart";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch products FIRST
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/`);
        const fetchedProducts = res.data.data;
        setProducts(fetchedProducts);
        
        // 2. AFTER products are set, restore cart
        try {
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
          console.log("Saved cart:", savedCart);
          
          // Match saved cart items with fetched products
          const restoredCart = savedCart.map(savedItem => {
            const product = fetchedProducts.find(p => p._id === savedItem._id);
            return product ? { ...product, qty: savedItem.qty } : null;
          }).filter(Boolean); // Remove null entries (products not found)
          
          setCart(restoredCart);
        } catch (localStorageError) {
          console.error("Failed to restore cart:", localStorageError);
          setCart([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // No dependencies: runs once on mount

  // 3. Auto-save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length === 0) return; // Skip if cart is empty
    try {
      const simplifiedCart = cart.map(({ _id, qty }) => ({ _id, qty }));
      localStorage.setItem("cart", JSON.stringify(simplifiedCart));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      updated.splice(index, 1);
      return updated;
    });
  };

  const buyNow = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Redirecting to checkout...");
    setCart([]);
    localStorage.removeItem("cart");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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