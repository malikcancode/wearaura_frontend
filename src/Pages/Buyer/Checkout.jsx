import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { FaCreditCard, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router";

function Checkout() {
  const { cartItems, totalPrice, totalItems, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const items = cartItems.map((item) => ({
        product: item.productId,
        variationId: item.variationId,
        quantity: item.quantity,
        size: item.size,
      }));

      const SHIPPING_PRICE = 100;
      const totalAmount = totalPrice + SHIPPING_PRICE;

      const res = await fetch("http://localhost:5000/api/orders/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          items,
          subtotal: totalPrice,
          shippingPrice: SHIPPING_PRICE,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "Order failed");

      setSuccess("Order placed successfully!");
      clearCart();
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#effbdb] p-6">
      <h1 className="text-2xl font-bold mb-8 text-[#10212b] text-start">
        Checkout
      </h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-[#10212b]">
              <FaTruck className="text-[#8fa464]" /> Shipping Information
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={shipping.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8fa464] outline-none"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={shipping.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8fa464] outline-none"
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8fa464] outline-none"
              />
              <input
                name="city"
                type="text"
                placeholder="City"
                value={shipping.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8fa464] outline-none"
              />
              <textarea
                name="address"
                placeholder="Address"
                rows={3}
                value={shipping.address}
                onChange={handleChange}
                className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8fa464] outline-none"
              />
            </form>
          </div>
          {/* Payment Info */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-[#10212b]">
              <FaCreditCard className="text-[#8fa464]" /> Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked
                  readOnly
                  className="accent-[#8fa464]"
                />
                <span className="text-[#10212b]">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>
        {/* Right Section - Order Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-[#10212b]">
            Order Summary
          </h2>
          <div className="flex justify-between mb-2 text-[#10212b]">
            <span>Subtotal:</span>
            <span>{totalPrice} $</span>
          </div>
          <div className="flex justify-between mb-2 text-[#10212b]">
            <span>Shipping:</span>
            <span>100 $</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg text-[#10212b]">
            <span>Total:</span>
            <span>{totalPrice + 100} $</span>
          </div>

          <button
            className="mt-6 w-full bg-[#8fa464] text-[#10212b] font-semibold py-3 cursor-pointer hover:bg-[#7c8f56] transition"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-600 mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
