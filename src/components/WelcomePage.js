import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import Header from "./Header";

const WelcomePage = ({ cartCount, updateCartCount, cartItems }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(cartItems);
  const token = localStorage.getItem("authToken");

  console.log("filter product:", filteredProducts);

  async function fetchProfile(userId) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/profile/${userId}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );

      const data = await response.json();
      const responseData = data?.data?.attributes?.data;

      if (response.ok && responseData) {
        setUserName(responseData?.address_details?.name || "Guest");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProductsByType(type) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/list/product/${type}`,
        {
          method: "GET",
          headers: { Authorization: token },
        }
      );

      const data = await response.json();
      console.log("filtered data", data);
      if (response.ok) {
        const updatedCart = {};
        const responseArray = data?.data?.attributes?.data;
        responseArray.forEach((item) => {
          updatedCart[item._id] = {
            id: item._id,
            name: item.product_name,
            price: item.price,
            discountPrice: item.discount,
            product_img: item.product_img,
            description: item.description,
            count: item.qty || 0,
          };
        });
        setFilteredProducts(updatedCart);
      } else {
        console.error(`Failed to fetch products for ${type}:`, data.message);
      }
    } catch (error) {
      console.error(`Error fetching products for ${type}:`, error);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchProductsByType("Greens");
  }, []);

  return (
    <div>
      <Header cartCount={cartCount} />
      <div className="p-2 m-2">
        <header className="flex justify-between items-center pb-6">
          <h1 className="text-xl font-semibold">
            Welcome {loading ? "..." : userName}
          </h1>
        </header>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => fetchProductsByType("Greens")}
            className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto"
          >
            <img
              src="/assets/grass.png"
              alt="Greens"
              className="w-10 h-10 rounded-full pr-1"
            />
            Greens
          </button>
          <button
            onClick={() => fetchProductsByType("Batters")}
            className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto"
          >
            <img
              src="/assets/grass.png"
              alt="Batters"
              className="w-10 h-10 rounded-full pr-1"
            />
            Batters
          </button>
          <button
            onClick={() => fetchProductsByType("Sprouts")}
            className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto"
          >
            <img
              src="/assets/grass.png"
              alt="Sprouts"
              className="w-10 h-10 rounded-full pr-1"
            />
            Sprouts
          </button>
          <button
            onClick={() => fetchProductsByType("Ghee")}
            className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto"
          >
            <img
              src="/assets/grass.png"
              alt="Ghee"
              className="w-10 h-10 rounded-full pr-1"
            />
            Ghee
          </button>
        </div>

        <CartItems
          cartCount={cartCount}
          updateCartCount={updateCartCount}
          cartProductArray={filteredProducts}
        />
      </div>
    </div>
  );
};

export default WelcomePage;
