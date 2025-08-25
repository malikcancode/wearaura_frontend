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
import CategoryProductsPage from "./Pages/Buyer/CategoryProductsPage";
import ProductDetails from "./Components/ProductDetails";
import AdminLayout from "./Pages/AdminDashboard/AdminLayout";
import Users from "./Pages/AdminDashboard/Users";
import Products from "./Pages/AdminDashboard/Products";
import Notifications from "./Pages/AdminDashboard/Notifications";
import Settings from "./Pages/AdminDashboard/Settings";
import Orders from "./Pages/AdminDashboard/Orders";
import CreateProduct from "./Pages/AdminDashboard/CreateProduct";
import Cart from "./Pages/Buyer/Cart";
import Checkout from "./Pages/Buyer/Checkout";
import ViewProductDetails from "./Pages/AdminDashboard/ViewProductDetails";
import ViewOrderDetails from "./Pages/AdminDashboard/ViewOrderDetails";
import { useEffect } from "react";
import { onMessageListener, requestForToken } from "./firebase";

const isAuthenticated = () => {
  return !!localStorage.getItem("userToken");
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  useEffect(() => {
    requestForToken().then((token) => {
      console.log("Token received from frontend:", token);
      // TODO: send token to backend (Node.js + MongoDB)
    });

    onMessageListener().then((payload) => {
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryProductsPage />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="create-product/:id" element={<CreateProduct />} />
          <Route path="view-order-details/:id" element={<ViewOrderDetails />} />
          <Route path="view-details/:id" element={<ViewProductDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
