import { useState } from "react";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      userId: "U123",
      phone: "9876543210",
      password: "******",
    },
    {
      id: 2,
      name: "Alice Smith",
      userId: "U456",
      phone: "9123456789",
      password: "******",
    },
    {
      id: 3,
      name: "Bob Johnson",
      userId: "U789",
      phone: "9567823412",
      password: "******",
    },
    {
      id: 4,
      name: "Charlie Brown",
      userId: "U101",
      phone: "9898765432",
      password: "******",
    },
  ]);
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
            <h1 className="text-xl font-bold">User Management</h1>
            <button className="m-2 p-2 bg-black text-white hover:bg-blue-600">
              <Link to={"/adduser"}> Add User</Link>
            </button>
          </div>
          <div className="overflow-auto">
            <table className="w-full border border-gray-200">
              <thead className=" bg-purple-400">
                <tr>
                  <th className="p-2 border border-gray-200">User Name</th>
                  <th className="p-2 border border-gray-200">User ID</th>
                  <th className="p-2 border border-gray-200">Phone Number</th>
                  <th className="p-2 border border-gray-200">Password</th>
                  <th className="p-2 border border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200">{user.name}</td>
                    <td className="p-2 border border-gray-200">
                      {user.userId}
                    </td>
                    <td className="p-2 border border-gray-200">{user.phone}</td>
                    <td className="p-2 border border-gray-200">
                      {user.password}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex space-x-2">
                        <button className="text-blue-500">Edit</button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(user.id)}
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

export default UserManagement;
