const AdminPanel = () => {
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
              User Management
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Inventory Management
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Delivery Management
            </li>
            <li className="hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
              Community Management
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Inventory Management</h1>
            <button className="m-2 p-2 bg-black text-white hover:bg-blue-600">
              Add Product
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
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="p-2 border border-gray-200">Product A</td>
                    <td className="p-2 border border-gray-200">23</td>
                    <td className="p-2 border border-gray-200">21</td>
                    <td className="p-2 border border-gray-200">
                      <div className="w-8 h-8 bg-gray-200"></div>
                    </td>
                    <td className="p-2 border border-gray-200">fresh greens</td>
                    <td className="p-2 border border-gray-200">
                      <div className="flex space-x-2">
                        <button className="text-blue-500">Edit</button>
                        <button className="text-red-500">Delete</button>
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

export default AdminPanel;
