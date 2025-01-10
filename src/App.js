import AddAddressForm from "./components/AddressForm";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addressform" element={<AddAddressForm />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
