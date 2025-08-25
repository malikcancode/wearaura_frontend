import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../../Components/DashboardCard";
import { FaUserCheck, FaClipboardList, FaDollarSign } from "react-icons/fa";
import ProductChart from "../../Components/ProductChart";
import RecentActivity from "../AdminDashboard/RecentActivity";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeUsers: 0,
    todayOrders: 0,
    totalUsers: 0,
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="w-full">
      <h2 className="text-4xl mb-2 font-bold text-white">Dashboard Overview</h2>
      <p className="mb-4">
        Welcome back! Here's what's happening with your store today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={FaDollarSign}
          color="#6366F1"
        />
        <DashboardCard
          title="Active Users"
          value={stats.activeUsers}
          icon={FaUserCheck}
          color="#6366F1"
        />
        <DashboardCard
          title="Today’s Orders"
          value={stats.todayOrders}
          icon={FaClipboardList}
          color="#6366F1"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <ProductChart />
        </div>
        <div className="md:w-3/5">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
