import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AddAddressForm from "./AddressForm";
import WelcomePage from "./WelcomePage";
import ProfilePage from "./ProfilePage";
import HomePage from "./Test";
import CartPage from "./CartPage";
import CartItems from "./CartItems";
import CheckoutPage from "./CheckoutPage";
import InventoryManagement from "./InventoryManagement";
import UserManagement from "./UserManagement";
import CommunityManagement from "./CommunityManagement";
import DeliveryManagement from "./DeliveryManagement";
import EditProduct from "./EditProduct";
import AddUser from "./AddUser";
import AddCommunity from "./AddCommunity";
import { ToastContainer } from "react-toastify";
import useFetchCart from "../customhooks/useFetchCart";
import AdminLogin from "./AdminLogin";
import CreateAdminUser from "./CreateAdminUser";

function ManiPage() {
  useFetchCart();
  return (
    <div>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/loginadmin" element={<AdminLogin />} />
          <Route path="/createadmin" element={<CreateAdminUser />} />
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default ManiPage;
