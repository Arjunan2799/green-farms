import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
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
        // ✅ Logout successful: Clear user session
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);

        alert("Logout successful!");
        navigate("/");
      } else {
        alert(data?.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="flex justify-between bg-orange-100 shadow-lg m-2 ">
      <div className=" w-35 p-2 m-2">
        <img src="/assets/logo.png" alt="Logo" />
      </div>
      <div className="flex items-end">
        <ul className="flex p-4 m-4">
          <li>
            <Link to="/cartpage">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/profilepage">
              <i className="fas fa-user"></i>
            </Link>
          </li>
          {isLoggedIn ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
