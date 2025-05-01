import React from "react";

const ProductCard = ({ product, onAdd, onQtyChange }) => {
  const handleQtyIncrease = () => {
    if (product.qty < product.quantity) {
      onQtyChange(product._id, product.qty + 1);
    } else {
      alert("Maximum available stock reached");
    }
  };

  const handleQtyDecrease = () => {
    if (product.qty > 1) {
      onQtyChange(product._id, product.qty - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-lg shadow-md gap-4 sm:gap-0">
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
      />

      {/* Product Info */}
      <div className="flex-1 sm:ml-4 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
        <p className="text-red-500 font-bold">${product.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex justify-center sm:justify-start items-center space-x-2">
        <button
          onClick={handleQtyDecrease}
          className="px-3 py-1 bg-gray-300 rounded text-xl"
        >
          -
        </button>
        <input
          type="text"
          value={product.qty}
          className="w-10 text-center border rounded"
          readOnly
        />
        <button
          onClick={handleQtyIncrease}
          className="px-3 py-1 bg-gray-300 rounded text-xl disabled:opacity-50"
          disabled={product.qty >= product.quantity}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <div className="text-center sm:text-right sm:mx-2">
        <button
          onClick={() => onAdd(product)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
