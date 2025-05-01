import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAddToCart }) => {
  const [productList, setProductList] = useState([]);

  // When products change (after API call), update internal state
  useEffect(() => {
    const updated = products.map((product) => ({ ...product, qty: 1 }));
    setProductList(updated);
  }, [products]);

  const handleQtyChange = (productId, qty) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product._id === productId ? { ...product, qty: qty } : product
      )
    );
  };

  return (
    <div className="w-full lg:w-3/4 space-y-6">
      {productList.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAdd={onAddToCart}
          onQtyChange={handleQtyChange}
        />
      ))}
    </div>
  );
};

export default ProductList;
