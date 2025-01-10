import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddressForm = () => {
  const [addressDetails, setAddressDetails] = useState({
    name: "",
    community: "",
    block: "",
    flat: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !addressDetails.name ||
      !addressDetails.community ||
      !addressDetails.block ||
      !addressDetails.flat
    ) {
      alert("Please fill in all fields");
      return;
    }

    const mobileNumber = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[mobileNumber]) {
      users[mobileNumber] = {
        ...users[mobileNumber],
        ...addressDetails,
      };
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Address saved successfully!");
    navigate("/welcomepage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Address
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={addressDetails.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="community"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select your community
            </label>
            <select
              id="community"
              value={addressDetails.community}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select your community</option>
              <option value="community1">Community 1</option>
              <option value="community2">Community 2</option>
              <option value="community3">Community 3</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="block"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Block/Floor
            </label>
            <input
              type="text"
              id="block"
              placeholder="Ex: Block B"
              value={addressDetails.block}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="flat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Flat/Door Number
            </label>
            <input
              type="text"
              id="flat"
              placeholder="Enter your flat number"
              value={addressDetails.flat}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
