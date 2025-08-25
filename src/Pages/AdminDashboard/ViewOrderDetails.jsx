import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeleteOrder = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/orders/${order._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admindashboard/orders");
    } catch (err) {
      alert("Failed to delete order. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setOrder(res.data);
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-600";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-emerald-600";
      case "cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!order)
    return (
      <div className="text-center mt-10 text-gray-400">Order not found.</div>
    );

  return (
    <div className="text-white bg-[#1f1b2e] min-h-screen p-0">
      <h2 className="text-2xl font-bold text-start py-4">Order Details</h2>
      <div className="bg-[#23233D] p-6 border border-[#2a2a2a] shadow-lg max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-2 border-b border-gray-600 pb-2">
            Buyer Information
          </h3>
          <div className="mb-4 mt-3 space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {order.buyer.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.buyer.email}
            </p>
            <p>
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span
              className={`text-xs px-3 py-1 rounded-full text-white ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-1">Total Amount</h4>
            <p className="text-[#00bcd4] text-lg font-bold">
              ${order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 border-b border-gray-600 pb-2">
            Order Items
          </h3>
          <ul className="space-y-3 mt-3">
            {order.items.map((item) => {
              let displayName = item.product?.name || "Product deleted";
              // Find variation name if variationId and variations exist
              if (
                item.variationId &&
                item.product &&
                Array.isArray(item.product.variations)
              ) {
                const variation = item.product.variations.find(
                  (v) => v._id === item.variationId
                );
                if (variation) {
                  displayName = variation.name;
                }
              }
              return (
                <li
                  key={item._id}
                  className="bg-[#6c757d] rounded-lg p-3 flex flex-col"
                >
                  <span className="font-semibold">Product: {displayName}</span>
                  {item.size && (
                    <span>
                      Size: <span className="font-bold">{item.size}</span>
                    </span>
                  )}
                  <span>
                    Quantity: <span className="font-bold">{item.quantity}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 max-w-7xl mx-auto">
        <button
          className="border border-[#3a3a3a] px-4 py-2 hover:bg-[#2e2e4d] transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition"
          onClick={handleDeleteOrder}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default ViewOrderDetails;
