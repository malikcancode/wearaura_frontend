import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);

      setUser({
        token: res.data.token,
        role: res.data.role,
        name: res.data.name,
        email: res.data.email,
      });

      if (res.data.role === "buyer") navigate("/homepage");
      else if (res.data.role === "admin") navigate("/admindashboard");
      else navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed"
      );
    }
    setLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#10212B]">
      <div className="flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#EFFBDB]">Login</h2>

          <div className="flex items-center border border-[#EFFBDB] px-3 py-2 rounded">
            <i className="bx bx-envelope text-[#EFFBDB] text-xl mr-2"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full focus:outline-none bg-transparent text-[#EFFBDB] placeholder-[#EFFBDB]"
              required
            />
          </div>

          <div className="flex items-center border border-[#EFFBDB] px-3 py-2 rounded">
            <i className="bx bx-lock-alt text-[#EFFBDB] text-xl mr-2"></i>
            <input
              type="password"
              value={form.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="w-full focus:outline-none bg-transparent text-[#EFFBDB] placeholder-[#EFFBDB]"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#EFFBDB] w-full cursor-pointer py-2 text-[#10212B] font-semibold rounded hover:opacity-90 "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-sm text-[#EFFBDB] text-center mt-2">
            <Link to="/reset-password" className="underline ">
              Forgot Password?
            </Link>
          </div>

          <div className="text-sm text-[#EFFBDB] text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="underline">
              Create account
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src="/loginpage.jpeg"
          alt="Login"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
