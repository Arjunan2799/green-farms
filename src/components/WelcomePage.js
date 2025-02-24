import React from "react";
import CartItems from "./CartItems";
import Header from "./Header";
import Test from "./Test";

const WelcomePage = ({ cartCount, updateCartCount, cartItems }) => {
  return (
    <div>
      <Header cartCount={cartCount} />
      <div className="p-2 m-2">
        <header className="flex justify-between items-center pb-6">
          <h1 className="text-xl font-semibold">Welcome DJ</h1>
        </header>
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-green-200 rounded-full">
            Greens
          </button>
          <button className="px-4 py-2 bg-yellow-200 rounded-full">
            Batters
          </button>
          <button className="px-4 py-2 bg-yellow-300 rounded-full">
            Sprouts
          </button>
          <button className="px-4 py-2 bg-yellow-400 rounded-full">Ghee</button>
        </div>

        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-gray-200 rounded-full">All</button>
          <button className="px-4 py-2 bg-green-300 rounded-full">
            Trending
          </button>
          <button className="px-4 py-2 bg-green-300 rounded-full">
            Seasonal
          </button>
        </div>

        <CartItems
          cartCount={cartCount}
          updateCartCount={updateCartCount}
          cartProductArray={cartItems}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
