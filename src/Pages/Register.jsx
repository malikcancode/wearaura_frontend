import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
      });

      await axios.post("http://localhost:5000/api/otp/send-otp", {
        email: form.email,
      });

      localStorage.setItem("registerEmail", form.email);
      navigate("/verify-otp");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed"
      );
    }
    setLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#d9cbb3]">
      <div className="hidden md:block">
        <img
          src="/loginpage.jpeg"
          alt="Register"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#5a463a]">
            Register Account
          </h2>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-user text-[#5a463a] text-xl mr-2"></i>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full focus:outline-none bg-transparent text-[#5a463a] placeholder-[#5a463a]"
              required
            />
          </div>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-envelope text-[#5a463a] text-xl mr-2"></i>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full focus:outline-none bg-transparent text-[#5a463a] placeholder-[#5a463a]"
              required
            />
          </div>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-lock-alt text-[#5a463a] text-xl mr-2"></i>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full focus:outline-none bg-transparent text-[#5a463a] placeholder-[#5a463a]"
              required
            />
          </div>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-user-check text-[#5a463a] text-xl mr-2"></i>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-transparent text-[#5a463a] focus:outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-[#5a463a] w-full py-2 text-white font-semibold rounded hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-sm text-[#5a463a] text-center space-y-2">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline hover:text-[#3e2f25]">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
