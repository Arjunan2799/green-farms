import AddAddressForm from "./components/AddressForm";
import AdminPanel from "./components/AdminPanel";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import EditProduct from "./components/EditProduct";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addressform" element={<AddAddressForm />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/editpanel" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
