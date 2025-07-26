import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import VerifyOtp from "./Pages/VerifyOtp";
import Login from "./Pages/Login";
import BuyerPage from "./Pages/Buyer/BuyerPage";
import SellerPage from "./Pages/Seller/SellerPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import Redirector from "./Components/Redirector";
import Shop from "./Pages/Buyer/Shop";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import SetNewPassword from "./Pages/SetNewPassword";
import NewArrivals from "./Pages/Buyer/NewArrivals";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

const isAuthenticated = () => {
  return !!localStorage.getItem("userToken");
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirector />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-password/:token" element={<SetNewPassword />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/homepage" element={<BuyerPage />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/seller-homepage" element={<SellerPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
