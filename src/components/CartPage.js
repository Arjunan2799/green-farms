import React from "react";

import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  async function fetchCartItems() {
    try {
      const response = await fetch("http://localhost:8000/api/user/cart", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log("aaaaaaaaaaccccc", data);
      const responseData = data?.data?.attributes?.data;
      console.log("responsedataaaaa", responseData);
      if (response.ok) {
        setCartItems(responseData || []);
      } else {
        console.error("Failed to fetch cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Cart</h1>
        <button>
          <img src="/close-icon.png" alt="Close" className="h-6 w-6" />
        </button>
      </header>

      <div className="space-y-4 mb-6">
        {loading ? (
          <p>Loading cart items...</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`/assets/grass.png`}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name || "Unknown Item"}</p>
                  <p className="text-gray-500">₹{item.price || "0.00"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg">
                  -
                </button>
                <span>{item.qty || 1}</span>
                <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg">
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Subtotal</span>
          <span>
            ₹
            {cartItems.reduce(
              (total, item) => total + (item.price || 0) * (item.qty || 1),
              0
            )}
          </span>
        </div>
        <button className="bg-green-500 text-white w-full py-2 rounded-lg mb-2">
          Proceed To Buy
        </button>
        <button className="border border-green-500 text-green-500 w-full py-2 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CartPage;
