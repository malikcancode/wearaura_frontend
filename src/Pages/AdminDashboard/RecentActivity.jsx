import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/activity-logs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        console.log(res);

        setActivities(res.data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch activity logs:", err.message);
      }
    };

    fetchActivityLogs();
  }, []);

  return (
    <div className="bg-[#2e294e] p-4 rounded-lg h-full text-sm">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity._id} className="border-b border-zinc-700 pb-2">
            <p className="text-white">{activity.details}</p>
            <span className="text-gray-400 text-xs">
              {new Date(activity.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
        {activities.length === 0 && (
          <li className="text-gray-400 text-center">No recent activity.</li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
