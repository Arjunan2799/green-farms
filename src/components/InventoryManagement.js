import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/all-product"
      );
      const data = await response.json();
      const responseData = data?.data?.attributes?.data;
      console.log("data", data, "reponse", response);
      if (response.ok) {
        if (responseData.length > 0) {
          console.log("responsedata", data);
          updateProducts(responseData);
        } else {
          setProducts([]);
        }
        //console.log("All product data:", data);
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

  function updateProducts(productList) {
    const formattedProducts = productList.map((item) => ({
      id: item._id,
      name: item.product_name,
      price: item.price,
      discountPrice: item.discount,
      product_img: item.product_img,
      description: item.description,
    }));
    setProducts(formattedProducts);
  }

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    is_out_of_stock: false,
    product_img: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!newProduct.product_name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/add-product",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();
      console.log("postdata", data);

      if (response.ok) {
        alert("Product added successfully!");
        fetchProducts();

        setNewProduct({
          product_name: "",
          price: "",
          discount: "",
          stock: "",
          description: "",
          is_out_of_stock: false,
          product_img: "",
        });
        setIsFormVisible(false);
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const handleDelete = (id) => {
    async function deleteProduct() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/admin/delete-product/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Deleted sucessfully");
          fetchProducts();
        } else {
          alert("failed to delete");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    deleteProduct();
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
              onClick={() => setIsFormVisible(true)}
            >
              Add Product
            </button>
          </div>

          {isFormVisible && (
            <div className="p-4 border border-gray-300 bg-white shadow-md">
              <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
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
                  Submit
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
                  <th className="p-2 border border-gray-200">Product Name</th>
                  <th className="p-2 border border-gray-200">Price</th>
                  <th className="p-2 border border-gray-200">Discount Price</th>
                  <th className="p-2 border border-gray-200">Image</th>
                  <th className="p-2 border border-gray-200">Description</th>
                  <th className="p-2 border border-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {console.log("productupdates", products)}
                {products.length > 0 ? (
                  products.map((product) => (
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
                        <img
                          src={"/assets/grass.png"}
                          alt={product.name}
                          className="w-8 h-8"
                        />
                      </td>
                      <td className="p-2 border border-gray-200">
                        {product.description}
                      </td>
                      <td className="p-2 border border-gray-200">
                        <button className="text-blue-500">Edit</button>
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
