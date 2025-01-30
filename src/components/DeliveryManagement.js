import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      community: "Greenwood Apartments",
      occurrence: "Weekly",
      person: "John Doe",
    },
    {
      id: 2,
      community: "Sunrise Towers",
      occurrence: "Daily",
      person: "Alice Smith",
    },
    {
      id: 3,
      community: "Oakwood Villas",
      occurrence: "Monthly",
      person: "Bob Johnson",
    },
    {
      id: 4,
      community: "Silver Heights",
      occurrence: "Bi-weekly",
      person: "Charlie Brown",
    },
  ]);

  const handleDelete = (id) => {
    setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
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
            <h1 className="text-xl font-bold"> Delivery Management</h1>
            <button className="m-2 p-2 bg-black text-white hover:bg-blue-600">
              Assign Delivery Person
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
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200">
                      {delivery.community}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {delivery.occurrence}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {delivery.person}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex space-x-2">
                        <button className="text-blue-500">Edit</button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(delivery.id)}
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

export default DeliveryManagement;
