import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("registerEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/otp/verify-otp", {
        email,
        otp,
      });
      localStorage.removeItem("registerEmail");
      alert("Email verified! Please login.");
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "OTP verification failed"
      );
    }
    setLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#d9cbb3]">
      {/* Left Image */}
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="OTP Verification"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-md bg-white p-8 rounded shadow"
        >
          <h2 className="text-2xl font-bold text-[#5a463a] text-center">
            Verify OTP
          </h2>
          <p className="text-[#5a463a] text-center">
            Enter the 6-digit OTP sent to your email: <b>{email}</b>
          </p>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-[#5a463a] px-3 py-2 rounded focus:outline-none text-[#5a463a]"
            required
          />
          <button
            type="submit"
            className="bg-[#5a463a] w-full py-2 text-white font-semibold rounded hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
