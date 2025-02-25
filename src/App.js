import AddAddressForm from "./components/AddressForm";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import EditProduct from "./components/EditProduct";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryManagement from "./components/InventoryManagement";
import UserManagement from "./components/UserManagement";
import CommunityManagement from "./components/CommunityManagement";
import DeliveryManagement from "./components/DeliveryManagement";
import AddUser from "./components/AddUser";
import AddCommunity from "./components/AddCommunity";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CartItems from "./components/CartItems";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Test from "./components/Test";
// import { Provider } from "react-redux";
// import appStore from "./utils/appStore";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("authToken");
  async function fetchCartItems() {
    try {
      const response = await fetch("http://localhost:8000/api/user/cart", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      console.log("aaaaaaaaaaccccc", data);
      const responseData = data?.data?.attributes?.data || [];
      if (response.ok) {
        setProductCount(responseData.length);
        setCartItems(responseData);
      } else {
        console.error("Failed to fetch cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  useEffect(() => {
    fetchCartItems();
  }, [cartCount]);
  return (
    // <Provider store={appStore}>
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/addressform" element={<AddAddressForm />} />
        <Route
          path="/welcomepage"
          element={
            <WelcomePage
              updateCartCount={setCartCount}
              cartCount={productCount}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/product/:id" element={<CartItems />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        <Route path="/Inventory" element={<InventoryManagement />} />
        <Route path="/User" element={<UserManagement />} />
        <Route path="/Community" element={<CommunityManagement />} />
        <Route path="/Delivery" element={<DeliveryManagement />} />
        <Route path="/editpanel" element={<EditProduct />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addcommunity" element={<AddCommunity />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <ToastContainer />
    </div>
    // </Provider>
  );
}

export default App;
