import React, { useState, useEffect } from "react";
import AdminManagementUi from "../../Components/AdminManagementUi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this import

function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add this line

  const handleUpdateStatus = async (orderId, status) => {
    const token = localStorage.getItem("userToken");
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/orders/getOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setOrders(res.data);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    `${order._id} ${order.buyer?.name ?? ""} ${order.buyer?.email ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="text-white">
      <AdminManagementUi
        heading="Order Management"
        description="Track and manage customer orders."
        placeholder="Search by order ID, name or email..."
        onSearch={setSearch}
      />

      <div className="bg-[#1a1a2e] rounded-lg p-4 border border-zinc-700">
        <h3 className="text-lg font-semibold mb-4">All Orders</h3>
        {loading ? (
          <div className="text-center py-8 text-gray-400">
            Loading orders...
          </div>
        ) : (
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-400">
                <th className="px-3 py-2">Order ID</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Items</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr
                  key={order._id}
                  className="rounded-md transition hover:bg-[#33334d]"
                >
                  <td className="px-3 py-3 font-medium">{order._id}</td>
                  <td className="px-3 py-3">
                    <div className="font-medium">
                      {order.buyer?.name ?? "N/A"}
                    </div>
                    <div className="text-gray-400 text-xs truncate w-40">
                      {order.buyer?.email ?? "N/A"}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white
      ${
        order.status === "pending"
          ? "bg-yellow-500"
          : order.status === "confirmed"
          ? "bg-green-600"
          : order.status === "shipped"
          ? "bg-blue-500"
          : order.status === "delivered"
          ? "bg-emerald-600"
          : order.status === "cancelled"
          ? "bg-red-600"
          : "bg-gray-500"
      }`}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    ${order.totalAmount?.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="px-3 py-3">{order.items?.length ?? 0}</td>
                  <td className="px-3 py-3">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="relative inline-block text-left">
                      <input
                        type="checkbox"
                        id={`dropdown-toggle-${idx}`}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`dropdown-toggle-${idx}`}
                        className="cursor-pointer text-gray-400 hover:text-purple-400"
                      >
                        <i className="bx bx-dots-horizontal-rounded text-lg"></i>
                      </label>
                      <div className="hidden peer-checked:block absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-[#2a2a40] border border-zinc-700 shadow-lg">
                        <ul className="py-1 text-sm text-gray-100">
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-[#353553] block"
                              onClick={() =>
                                navigate(
                                  `/admindashboard/view-order-details/${order._id}`
                                )
                              }
                            >
                              View Details
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-[#353553] block"
                              onClick={() =>
                                handleUpdateStatus(order._id, "delivered")
                              }
                            >
                              Mark Complete
                            </button>

                            <li>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-[#353553] block"
                                onClick={() =>
                                  handleUpdateStatus(order._id, "confirmed")
                                }
                              >
                                Mark Confirmed
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-[#353553] block"
                                onClick={() =>
                                  handleUpdateStatus(order._id, "shipped")
                                }
                              >
                                Mark Shipped
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#4b1e1e] block"
                                onClick={() =>
                                  handleUpdateStatus(order._id, "cancelled")
                                }
                              >
                                Cancel Order
                              </button>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;
