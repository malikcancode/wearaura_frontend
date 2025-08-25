import React from "react";

const dummyNotifications = [
  {
    id: 1,
    title: "Order Delivered",
    message: "Your order ORD-1024 has been delivered successfully.",
    type: "success",
    date: "2024-07-25 14:30",
  },
  {
    id: 2,
    title: "New Order Received",
    message: "You received a new order ORD-1025 from Sarah Johnson.",
    type: "info",
    date: "2024-07-26 10:15",
  },
  {
    id: 3,
    title: "Payment Failed",
    message: "Payment for order ORD-1026 was unsuccessful.",
    type: "error",
    date: "2024-07-26 09:42",
  },
];

function Notifications() {
  return (
    <div className="text-white">
      <div className="p-2 border-zinc-700">
        <h3 className="text-2xl mb-2 font-bold text-white">Notifications</h3>
        <p className="mb-3 text-sm text-gray-400">
          Stay updated with your store activities and important alerts.
        </p>
        <div className="space-y-3">
          {dummyNotifications.map((noti) => (
            <div
              key={noti.id}
              className="flex items-center justify-between bg-[#2a2a40] p-4 rounded-md border border-zinc-700 shadow-sm hover:shadow-md transition"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">{noti.title}</h4>
                <p className="text-gray-400 text-sm truncate">{noti.message}</p>
                <p className="text-xs text-gray-500 mt-1">{noti.date}</p>
              </div>
              <div className="ml-4 flex gap-2">
                {noti.type === "success" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-600 text-white">
                    Delivered
                  </span>
                )}
                {noti.type === "info" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                    New
                  </span>
                )}
                {noti.type === "error" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-600 text-white">
                    Failed
                  </span>
                )}
              </div>
            </div>
          ))}
          {dummyNotifications.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
