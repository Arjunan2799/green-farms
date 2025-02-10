import React from "react";

import { useEffect, useState } from "react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(cartItems);
  const token = localStorage.getItem("authToken");
  async function fetchCart() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/all-product"
      );
      const data = await response.json();
      const responseData = data?.data?.attributes?.data;
      console.log("data", data, "reponse", response);
      if (response.ok) {
        if (responseData.length > 0) {
          console.log("responsedatacart", data);
          updateProducts(responseData);
        } else {
          setCartItems([]);
        }
        //console.log("All product data:", data);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  function updateProducts(productList) {
    const formattedProducts = productList.map((item) => ({
      id: item._id,
      name: item.product_name,
      price: item.price,
      discountPrice: item.discount,
      product_img: item.product_img,
      description: item.description,
    }));
    setCartItems(formattedProducts);
  }

  async function handleAddToCart(productId) {
    try {
      const response = await fetch("http://localhost:8000/api/user/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          product_id: productId,
          qty: 1,
        }),
      });

      const data = await response.json();
      console.log("cart added", data);
      if (response.ok) {
        alert("Product added to cart successfully!");
        fetchCart();
      } else {
        alert(data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="flex flex-wrap justify-center">
      {loading ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="p-2 m-2 border-gray-200 border-b-2 text-left w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="w-full flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
              <img
                src={"/assets/grass.png"}
                className="w-full h-auto rounded-lg"
                alt={item.name}
              />
              <div className="text-center mt-2">
                <span className="font-semibold">{item.name}</span>
                <span className="block text-gray-700">₹ {item.price}</span>
              </div>
              <button
                className="mt-4 px-4 py-2 rounded-lg  bg-green-700 text-white shadow-lg w-full"
                onClick={() => handleAddToCart(item.id)}
              >
                Add
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>no cart to show</p>
      )}
    </div>
  );
};

export default CartItems;
