const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center justify-between mb-6">
        <button>
          <img src="/back-icon.png" alt="Back" className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <div></div>
      </header>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src="/assets/profile01.png"
              alt="Avatar"
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">DJ</h2>
              <p className="text-gray-500">+91-9123456780</p>
            </div>
          </div>
          <button className="text-blue-500">Edit</button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Address</h3>
          <p className="text-gray-500">
            Tower B-1802, Smondo 2 Apartment, Neotown, Chennai, 600100
          </p>
          <button className="text-blue-500 mt-1">Change</button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Wallet Balance</h3>
          <p className="text-lg font-bold">₹1012</p>
          <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg">
            Add Money
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-4">Your Orders</h3>
        {[1, 2].map((order, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src="/assets/spanish.png"
                alt="Arai Keerai"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">Arai Keerai, Spinach</p>
                <p className="text-gray-500">
                  Order Placed on: 12 Nov 2024, 06:10 AM
                </p>
                <p className="text-gray-500">Total: ₹36.00</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-lg">
              Delivered
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
