import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartItems = ({ cartCount, updateCartCount, cartProductArray }) => {
  const [cartItems, setCartItems] = useState({});
  const [cartItemsCount, setCartItemsCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  console.log("cartItem :", cartItems);
  console.log("cartProductArray :", cartProductArray);
  useEffect(() => {
    setCartItems(cartProductArray);
  }, [cartProductArray]);

  useEffect(() => {
    fetchCartItems();
  }, [cartCount]);

  console.log("cartCount : ", cartCount);
  // async function fetchCart() {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/admin/all-product"
  //     );
  //     const data = await response.json();
  //     const responseData = data?.data?.attributes?.data || [];

  //     if (response.ok) {
  //       const updatedCart = {};
  //       responseData.forEach((item) => {
  //         updatedCart[item._id] = {
  //           id: item._id,
  //           name: item.product_name,
  //           price: item.price,
  //           discountPrice: item.discount,
  //           product_img: item.product_img,
  //           description: item.description,
  //           count: item.qty || 0,
  //         };
  //       });

  //       setCartItems(updatedCart);
  //       updateCartCount(responseData.length);
  //     } else {
  //       console.error("Failed to fetch products:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // }
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
      const responseData = data?.data?.attributes?.data || [];
      console.log("responsedataaaaa", responseData);
      const formattedCartItems = responseData.map((item) => ({
        id: item.product_id?._id,
        name: item.product_id?.product_name || "Unknown Item",
        price: item.product_id?.price || 0,
        qty: item.qty || 1,
        totalPrice: (item.product_id?.price || 0) * (item.qty || 1),
        user_id: item.user_id,
        cart_id: item.cart_id,
        product_img: item.product_id.product_img,
      }));
      console.log("formateddata", formattedCartItems);
      if (response.ok) {
        setCartItemsCount(formattedCartItems);
      } else {
        console.error("Failed to fetch cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  async function handleAddToCart(productId) {
    try {
      const response = await fetch("http://localhost:8000/api/user/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ product_id: productId, qty: 1 }),
      });

      if (response.ok) {
        updateCartCount((prevCart) => prevCart + 1);
        setCartItems((prevCart) => ({
          ...prevCart,
          [productId]: { ...prevCart[productId], count: 1 },
        }));
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function handleIncreaseQuantity(productId, change) {
    const newQty = (cartItems[productId]?.count || 0) + change;
    if (newQty < 1) {
      setCartItems((prevCart) => {
        const updatedCart = { ...prevCart };
        delete updatedCart[productId];
        return updatedCart;
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/user/incerment-homepage-cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ qty: 1 }),
        }
      );

      if (response.ok) {
        setCartItems((prevCart) => ({
          ...prevCart,
          [productId]: { ...prevCart[productId], count: newQty },
        }));
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  }
  async function handleDecreseQuantity(productId, change) {
    const newQty = (cartItems[productId]?.count || 0) + change;
    if (newQty < 1) {
      setCartItems((prevCart) => {
        const updatedCart = { ...prevCart };
        delete updatedCart[productId];
        return updatedCart;
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/user/decerment-homepage-cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ qty: -1 }),
        }
      );

      if (response.ok) {
        setCartItems((prevCart) => ({
          ...prevCart,
          [productId]: { ...prevCart[productId], count: newQty },
        }));
      } else {
        console.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  mt-4 w-full">
      {loading ? (
        Object.values(cartItems).map((item) => (
          <div key={item.id} className="p-2">
            <div className="w-full flex flex-col p-4 bg-white rounded-lg shadow-md mb-4">
              <img
                src={"/assets/grass.png"}
                className="w-full h-32 md:h-44 object-cover rounded-lg"
                alt={item.name}
              />

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-500">₹{item.price}</span>
                </div>

                {item.count > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecreseQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="px-4 py-2 bg-green-200 rounded-lg"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}

      {cartCount > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-full flex items-center gap-2 shadow-lg">
          <div className="flex -space-x-2">
            {cartItemsCount.map((item, index) => (
              <img
                key={item.cart_id}
                src={"/assets/grass.png"}
                alt={item?.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ zIndex: cartItems.length - index }}
              />
            ))}
          </div>
          <span>View Cart ({cartCount} Items)</span>
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
