import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!mobileNumber) {
      alert("Please enter your mobile number");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[mobileNumber]) {
      alert(`Welcome back, User!`);
      localStorage.setItem("loggedInUser", mobileNumber);
      navigate("/welcomepage");
    } else {
      users[mobileNumber] = { mobileNumber };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", mobileNumber);
      navigate("/addressform");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-[#f9f8f3] w-[320px] rounded-lg shadow-lg p-6">
        <h1 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Welcome to Farm Greens!
        </h1>

        <div>
          <label className="block text-sm text-gray-600 mb-1" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter Your Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button className="text-green-600 hover:underline">Cancel</button>
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
