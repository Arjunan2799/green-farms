import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_type: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    is_out_of_stock: false,
    product_img: "",
  });
  const notify = () => toast("Product have been updated successfully");
  const deleteToast = () => toast("Product Deleted Successfully");

  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/all-product"
      );
      const data = await response.json();
      const responseData = data?.data?.attributes?.data;
      if (response.ok) {
        setProducts(
          responseData?.map((item) => ({
            id: item._id,
            product_name: item.product_name,
            product_type: item.product_type,
            price: item.price,
            discount: item.discount,
            stock: item.stock,
            description: item.description,
            is_out_of_stock: item.is_out_of_stock,
            product_img: item.product_img,
          })) || []
        );
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field being changed is the product name, check if it's modified
    if (name === "product_name") {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        product_name: value || prevProduct.originalName, // Keep old name if empty
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      !newProduct.product_name ||
      !newProduct.product_type ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const url = editProductId
        ? `http://localhost:8000/api/admin/edit-product/${editProductId}`
        : "http://localhost:8000/api/admin/add-product";

      const method = editProductId ? "POST" : "POST";
      const requestBody = { ...newProduct };
      delete requestBody.id;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("edit api resonse", data);

      if (response.ok) {
        notify(
          editProductId
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        fetchProducts();
        setIsFormVisible(false);
        setNewProduct({
          product_name: "",
          product_type: "",
          price: "",
          discount: "",
          stock: "",
          description: "",
          is_out_of_stock: false,
          product_img: "",
        });
        setEditProductId(null);
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure want to delete")) {
        const response = await fetch(
          `http://localhost:8000/api/admin/delete-product/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          deleteToast();
          fetchProducts();
        } else {
          deleteToast("Failed to delete");
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditProductId(product.id);
    setIsFormVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <aside className="w-64 bg-gray-300 p-4">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="font-bold text-lg mb-4"
          />
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
            <button
              className="m-2 p-2 bg-black text-white hover:bg-blue-600"
              onClick={() => {
                setNewProduct({
                  product_name: "",
                  product_type: "",
                  price: "",
                  discount: "",
                  stock: "",
                  description: "",
                  is_out_of_stock: false,
                  product_img: "",
                });
                setEditProductId(null);
                setIsFormVisible(true);
              }}
            >
              Add Product
            </button>
          </div>

          {isFormVisible && (
            <div className="p-4 border border-gray-300 bg-white shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                {editProductId ? "Edit Product" : "Add New Product"}
              </h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Product Name"
                  name="product_name"
                  value={newProduct.product_name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Product Type"
                  name="product_type"
                  value={newProduct.product_type}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Discount"
                  name="discount"
                  value={newProduct.discount}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Product Image URL"
                  name="product_img"
                  value={newProduct.product_img}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  {editProductId ? "Update" : "Submit"}
                </button>
                <button
                  className="p-2 bg-red-600 text-white rounded-lg ml-2 hover:bg-red-700"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-auto mt-4">
            <table className="w-full border border-gray-200">
              <thead className="bg-purple-400">
                <tr>
                  <th className="p-2 border">Product Name</th>
                  <th className="p-2 border">Product Type</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Discount</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="even:bg-gray-50">
                      <td className="p-2 border">{product.product_name}</td>
                      <td className="p-2 border">{product.product_type}</td>
                      <td className="p-2 border">{product.price}</td>
                      <td className="p-2 border">{product.discount}</td>
                      <td className="p-2 border">
                        <img
                          src={"/assets/grass.png"}
                          alt={product.product_name}
                          className="w-8 h-8"
                        />
                      </td>
                      <td className="p-2 border">{product.description}</td>
                      <td className="p-2 border">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 ml-2"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-2">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagement;
