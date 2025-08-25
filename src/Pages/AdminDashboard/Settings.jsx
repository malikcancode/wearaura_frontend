import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Use context if available, else fallback to localStorage
    if (user?.name) {
      setUsername(user.name);
    } else {
      const storedName = localStorage.getItem("adminName");
      if (storedName) setUsername(storedName);
    }
  }, [user]);

  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/profile",
        {
          name: username,
          password: newPassword || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      localStorage.setItem("adminName", username);
      setUser((prev) => ({ ...prev, name: username })); // update context
      alert("Settings saved successfully.");
      setNewPassword("");
    } catch (err) {
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="text-white p-4">
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="border-b border-zinc-700 pb-4">
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your personal preferences and account details.
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-sm bg-[#2a2a40] border border-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your username"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm text-gray-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-sm bg-[#2a2a40] border border-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter new password"
          />
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
