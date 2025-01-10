import React from "react";
import CartItems from "./CartItems";
import Header from "./Header";

const WelcomePage = () => {
  return (
    <div>
      <Header />
      <div className="p-2 m-2">
        <div>
          <h2 className=" text-3xl font-bold px-2 mx-2">Welcome DJ</h2>
        </div>
        <p className="px-2 ">All your cooking green</p>
        <div className="flex">
          <div className="bg-orange-400 w-14 p-2 m-2 rounded-lg">
            <h4>Greens</h4>
          </div>
          <div className="bg-orange-400 w-14 p-2 m-2 rounded-lg">
            <h4>Greens</h4>
          </div>
          <div className="bg-orange-400 w-14 p-2 m-2 rounded-lg">
            <h4>Greens</h4>
          </div>
          <div className="bg-orange-400 w-14 p-2 m-2 rounded-lg">
            <h4>Greens</h4>
          </div>
        </div>

        <CartItems />
      </div>
    </div>
  );
};

export default WelcomePage;
