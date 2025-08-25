import React from "react";
import AdminSidebar from "../AdminDashboard/AdminSidbar";
import AdminNavbar from "../AdminDashboard/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="h-full bg-[#1f1b2e] text-white">
      <AdminNavbar />
      <div className="flex">
        <div className="w-1/5 border-r border-zinc-700 min-h-screen">
          <AdminSidebar />
        </div>
        <div className="w-4/5 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
