import { useState } from "react";
import { Link } from "react-router-dom";

const InventoryManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      price: 23,
      discountPrice: 21,
      description: "Fresh greens",
    },
    {
      id: 2,
      name: "Product B",
      price: 30,
      discountPrice: 27,
      description: "Organic apples",
    },
    {
      id: 3,
      name: "Product C",
      price: 15,
      discountPrice: 12,
      description: "Dairy milk",
    },
    {
      id: 4,
      name: "Product D",
      price: 40,
      discountPrice: 35,
      description: "Brown rice",
    },
  ]);
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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
            <h1 className="text-xl font-bold">Inventory Management</h1>
            <button className="m-2 p-2 bg-black text-white hover:bg-blue-600">
              <Link to={"/editpanel"}> Add Product</Link>
            </button>
          </div>
          <div className="overflow-auto">
            <table className="w-full border border-gray-200">
              <thead className=" bg-purple-400">
                <tr>
                  <th className="p-2 border border-gray-200">Product Name</th>
                  <th className="p-2 border border-gray-200">Price</th>
                  <th className="p-2 border border-gray-200">Discount Price</th>
                  <th className="p-2 border border-gray-200">Image</th>
                  <th className="p-2 border border-gray-200">Description</th>
                  <th className="p-2 border border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200">
                      {product.name}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {product.price}
                    </td>
                    <td className="p-2 border border-gray-200">
                      {product.discountPrice}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <div className="w-8 h-8 bg-gray-200"></div>
                    </td>
                    <td className="p-2 border border-gray-200">
                      {product.description}
                    </td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex space-x-2">
                        <button className="text-blue-500">Edit</button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(product.id)}
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

export default InventoryManagement;
