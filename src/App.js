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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/addressform" element={<AddAddressForm />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
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
      </Routes>
    </div>
  );
}

export default App;
