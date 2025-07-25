import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SetNewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#d9cbb3]">
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleReset}
          className="space-y-6 w-full max-w-md bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-3xl font-bold text-[#5a463a]">
            Create New Password
          </h2>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-lock-alt text-[#5a463a] text-xl mr-2"></i>
            <input
              type="password"
              placeholder="New Password"
              className="w-full focus:outline-none bg-transparent text-[#5a463a] placeholder-[#5a463a]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-[#5a463a] px-3 py-2 rounded">
            <i className="bx bx-lock text-[#5a463a] text-xl mr-2"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full focus:outline-none bg-transparent text-[#5a463a] placeholder-[#5a463a]"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#5a463a] text-white w-full py-2 rounded font-semibold hover:opacity-90 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>

      <div className="hidden md:block">
        <img
          src="/reset.jpg"
          alt="Reset Password"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default SetNewPassword;
