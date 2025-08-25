import React from "react";

function DashboardCard({ title, value, icon: Icon, color }) {
  return (
    <div className="flex items-center py-8 px-8 bg-[#2C2545] rounded-2xl shadow-md w-full max-w-sm">
      <div
        className={`p-4 rounded-full text-white text-2xl mr-4`}
        style={{ backgroundColor: color }}
      >
        <Icon />
      </div>
      <div>
        <h4 className="text-white text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
