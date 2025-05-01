import React from 'react';

const Cart = ({ cart, onRemove, onBuyNow }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="w-full lg:w-1/4 bg-white p-5 rounded-lg shadow-md h-fit">
    
      <h2 className="text-2xl font-bold mb-4 text-red-600">Shopping Cart</h2>
      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <span>{item.name} x {item.qty} - ${item.price * item.qty}</span>
            <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">🗑️</button>
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mt-4">Total: <span>${total.toFixed(2)}</span></p>
      <button
        onClick={onBuyNow}
        className="w-full bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
   
  );
};

export default Cart;
