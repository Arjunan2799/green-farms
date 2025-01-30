import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/");
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
