import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    name: "",
    community_id: "",
    block: "",
    flat_door: "",
    pincode: "",
  });
  const [communities, setCommunities] = useState([]);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const notify = () => toast("Address have updated Successfully");

  async function fetchProfile(userId) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user/profile/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      const responseData = data?.data?.attributes?.data;

      if (response.ok) {
        setProfile(responseData);
        if (responseData.address_details) {
          setAddressDetails({
            name: responseData.address_details.name || "",
            community_id: responseData.address_details.community_id || "",
            block: responseData.address_details.block || "",
            flat_door: responseData.address_details.flat_door || "",
            pincode: responseData.address_details.pincode || "",
          });
        }
      } else {
        console.error("Failed to fetch profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCommunity() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/all-community"
      );
      const data = await response.json();
      const responseData = data?.data?.attributes?.data;

      if (response.ok) {
        setCommunities(responseData || []);
      } else {
        console.error("Failed to fetch communities:", data.message);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  }

  useEffect(() => {
    fetchProfile("userId"); // Pass the correct user ID
    fetchCommunity();
  }, []);

  const handleEditAddress = () => {
    setEditAddress(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "community") {
      const selectedCommunity = communities.find((c) => c._id === value);
      setAddressDetails((prev) => ({
        ...prev,
        community_id: selectedCommunity ? selectedCommunity._id : "",
      }));
    } else {
      setAddressDetails((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/user/edit-address/${profile.address_details._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(addressDetails),
        }
      );

      const data = await response.json();

      if (response.ok) {
        notify("Address updated successfully!");
        navigate("/welcomepage");
        setEditAddress(false);
        fetchProfile("userId");
      } else {
        alert(data.message || "Failed to update address.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2"
        >
          <i className="fa-solid fa-arrow-left font-bold"></i>
        </button>
      </header>

      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="/assets/profile01.png"
                alt="Avatar"
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">
                  {profile.user_details?.name || "User"}
                </h2>
                <p className="text-gray-500">
                  {profile.user_details?.mobile_no || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-500">
              {profile.address_details
                ? `${profile.address_details.block}, ${profile.address_details.flat_door}, ${profile.address_details.pincode}`
                : "No Address Available"}
            </p>
            <button onClick={handleEditAddress} className="text-blue-500 mt-1">
              Edit Address
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Wallet Balance</h3>
            <p className="text-lg font-bold">
              ₹{profile.user_details?.wallet_balance || "0.00"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Profile not found.</p>
      )}
      {editAddress && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Address</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={addressDetails.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <select
                id="community"
                value={addressDetails.community_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Community</option>
                {communities.map((community) => (
                  <option key={community._id} value={community._id}>
                    {community.community_name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="block"
                placeholder="Block/Floor"
                value={addressDetails.block}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                id="flat_door"
                placeholder="Flat/Door No"
                value={addressDetails.flat_door}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                id="pincode"
                placeholder="Pincode"
                value={addressDetails.pincode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setEditAddress(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
