import React, { use } from "react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCart from "../customhooks/useFetchCart";
import useFetchAddCart from "../customhooks/useFetchAddCart";
import useCartIncrease from "../customhooks/useCartIncrease";
import ProductCard from "./ProductCard";

const CartItems = ({ cartProductArray }) => {
  // const [cartItems, setCartItems] = useState({});
  // const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const cartItemSelector = useSelector((state) => state.cart.items);
  const countItemSelector = useSelector((state) => state.cart.count);
  const counterItemSelector = useSelector((state) => state.cart.itemsCount);
  const { handleIncreaseQuantity, handleDecreseQuantity } = useCartIncrease();
  const addProductCart = useFetchAddCart();
  const addfetchCarts = useFetchCart();

  console.log("cartItemSelector", cartItemSelector);
  console.log("counterItemSelector", counterItemSelector);
  console.log("cartProductArray", cartProductArray);

  useEffect(() => {
    addProductCart();
    addfetchCarts();
  }, [cartProductArray]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-4 w-full">
      {loading ? (
        Object.values(cartProductArray).map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            addProductCart={addProductCart}
            handleDecreseQuantity={handleDecreseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
        ))
      ) : (
        <p>No items in cart</p>
      )}

      {countItemSelector > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-full flex items-center gap-8 shadow-lg">
          <div className="flex -space-x-2">
            {cartItemSelector.map((item, index) => (
              <img
                key={item.cart_id}
                src={"/assets/grass.png"}
                alt={item?.name}
                className="w-6 h-6 rounded-full border-2 border-green-200 sm:hidden"
                style={{ zIndex: cartItemSelector.length - index }}
              />
            ))}
          </div>
          <span>{`View Cart (${countItemSelector} Items)`}</span>
          <button
            className="px-3 py-1 bg-white text-green-500 rounded-full"
            onClick={() => navigate("/cartpage")}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItems;
