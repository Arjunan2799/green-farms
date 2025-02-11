import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const userId = "67a4f3ac3a0b37618c41ab3f"; // Replace this dynamically if needed

  async function fetchProfile() {
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
      console.log("profile", responseData);

      if (response.ok) {
        setProfile(responseData);
      } else {
        console.error("Failed to fetch profile:", data.message);
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
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-between mb-6">
        <button>
          <img src="/back-icon.png" alt="Back" className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <div></div>
      </header>

      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {/* User Details */}
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
            <button className="text-blue-500">Edit</button>
          </div>

          {/* Address */}
          <div className="mb-4">
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-500">
              {profile.address_details?.address || "No Address Available"}
            </p>
            <button className="text-blue-500 mt-1">Change</button>
          </div>

          {/* Wallet Balance */}
          <div className="mb-4">
            <h3 className="font-semibold">Wallet Balance</h3>
            <p className="text-lg font-bold">
              ₹{profile.user_details?.wallet_balance || "0.00"}
            </p>
            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg">
              Add Money
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Profile not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
