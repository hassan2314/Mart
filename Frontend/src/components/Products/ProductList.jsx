import React, { useState } from "react";
import ProductCard from "./ProductCard";

// Static products for now
const ProductList = ({ products, onAddToCart }) => {
  const [productList, setProductList] = useState(
    products.map((product) => ({ ...product, qty: 1 })) // Ensure each product has a quantity state
  );

  const handleQtyChange = (productId, qty) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productId ? { ...product, qty: qty } : product
      )
    );
  };

  return (
    <div className="w-full lg:w-3/4 space-y-6">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAddToCart}
          onQtyChange={handleQtyChange}
        />
      ))}
    </div>
  );
};

export default ProductList;
