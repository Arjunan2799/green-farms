import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const notify = () => toast("Logout successfully");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Auth Token:", token);

      if (!token) {
        alert("User is not logged in.");
        return;
      }

      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log("Logout Response:", data);

      if (response.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);

        notify();
        navigate("/login");
      } else {
        alert(data?.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="flex justify-between bg-orange-100 shadow-lg m-1 p-1">
      <div className=" w-24 p-1 m-1">
        <img src="/assets/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex items-end">
        <ul className="flex p-2 m-2">
          <li className="px-2 font-bold text-xl relative">
            <Link to="/cartpage">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          <li className="px-3 font-bold text-xl relative">
            <Link to="/profilepage">
              <i className="fas fa-user"></i>
            </Link>
          </li>
          {isLoggedIn ? (
            <button
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
