import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaBell,
  FaCogs,
  FaClipboardList,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "" },
    { label: "Users", icon: <FaUsers />, path: "users" },
    { label: "Products", icon: <FaBoxOpen />, path: "products" },
    { label: "Orders", icon: <FaClipboardList />, path: "orders" },
    { label: "Notifications", icon: <FaBell />, path: "notifications" },
    { label: "Settings", icon: <FaCogs />, path: "settings" },
  ];

  return (
    <div className="h-full bg-[#2c2545] p-6">
      <ul className="space-y-2">
        {navItems.map(({ label, icon, path }, index) => {
          const toPath = path ? `/admindashboard/${path}` : "/admindashboard";
          return (
            <li key={index}>
              <NavLink
                to={toPath}
                end
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-[#6366F1] text-white border border-zinc-700"
                      : "text-white hover:text-[#6366F1]"
                  }`
                }
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </NavLink>
            </li>
          );
        })}
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:text-[#6366F1] transition"
          >
            <span className="text-lg">
              <FiLogOut />
            </span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
