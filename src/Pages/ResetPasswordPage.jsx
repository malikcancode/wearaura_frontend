import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/request-reset",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#10212B]">
      <div className="flex items-center justify-center px-6">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#EFFBDB]">Reset Password</h2>

          <p className="text-[#EFFBDB] text-sm">
            Enter your email and we’ll send you a reset link.
          </p>

          <div className="flex items-center border border-[#EFFBDB] px-3 py-2 rounded">
            <i className="bx bx-envelope text-[#EFFBDB] text-xl mr-2"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full focus:outline-none bg-transparent text-[#EFFBDB] placeholder-[#EFFBDB]"
              required
            />
          </div>

          {message && (
            <div className="text-[#EFFBDB] text-sm text-center">{message}</div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#EFFBDB] w-full py-2 text-[#10212B] font-semibold rounded hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-sm text-[#EFFBDB] text-center mt-2">
            <Link to="/login" className="underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src="/cat.jpg"
          alt="Reset Password"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
