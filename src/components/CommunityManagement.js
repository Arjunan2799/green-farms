import { useState } from "react";
import { Link } from "react-router-dom";

const CommunityManagement = () => {
  const [communities, setCommunities] = useState([
    { id: 1, name: "Community A", occurrence: 23, deliveryPerson: "John" },
    { id: 2, name: "Community B", occurrence: 15, deliveryPerson: "Alice" },
    { id: 3, name: "Community C", occurrence: 18, deliveryPerson: "Michael" },
    { id: 4, name: "Community D", occurrence: 10, deliveryPerson: "Emma" },
  ]);

  // Delete Function
  const handleDelete = (id) => {
    const updatedCommunities = communities.filter(
      (community) => community.id !== id
    );
    setCommunities(updatedCommunities);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-300 p-4">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="font-bold text-lg mb-4"
          ></img>
          <ul className="space-y-2">
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              <Link to={"/User"}> User Management</Link>
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              <Link to={"/Inventory"}> Inventory Management </Link>
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              <Link to={"/Delivery"}> Delivery Management</Link>
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              <Link to={"/Community"}> Community Management</Link>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Community Management</h1>
            <button className="m-2 p-2 bg-black text-white hover:bg-blue-600">
              <Link to={"/addcommunity"}> Add Community</Link>
            </button>
          </div>
          <div className="overflow-auto">
            <table className="w-full border border-gray-200">
              <thead className=" bg-purple-400">
                <tr>
                  <th className="p-2 border border-gray-200">Community Name</th>
                  <th className="p-2 border border-gray-200">Occurrence</th>
                  <th className="p-2 border border-gray-200">
                    Devlivery Person
                  </th>
                  <th className="p-2 border border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {communities.map((community) => (
                  <tr key={community.id} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200">
                      {community.name}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {community.occurrence}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {community.deliveryPerson}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex space-x-2">
                        <button className="text-blue-500">Edit</button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(community.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityManagement;
