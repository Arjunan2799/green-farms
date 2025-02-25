import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import Header from "./Header";

const WelcomePage = ({ cartCount, updateCartCount, cartItems }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
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
      console.log("username", responseData);

      if (response.ok && responseData) {
        setUserName(responseData?.address_details?.name || "Guest");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
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
          <button className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto">
            <img
              src="/assets/grass.png"
              alt="Greens"
              className=" w-10 h-10 rounded-full pr-1"
            />
            Greens
          </button>
          <button className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center  sm:w-auto">
            <img
              src="/assets/grass.png"
              alt="Greens"
              className=" w-10 h-10 rounded-full pr-1"
            />
            Batters
          </button>
          <button className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto">
            <img
              src="/assets/grass.png"
              alt="Greens"
              className=" w-10 h-10 rounded-full pr-1"
            />
            Sprouts
          </button>
          <button className="px-4 py-2 bg-[#E7DBC4] rounded-lg flex items-center sm:w-auto">
            <img
              src="/assets/grass.png"
              alt="Greens"
              className=" w-10 h-10 rounded-full pr-1"
            />
            Ghee
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-slate-200 rounded-full">All</button>
          <button className="px-4 py-2 bg-green-200 rounded-full">
            Trending
          </button>
          <button className="px-4 py-2 bg-green-200 rounded-full">
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
