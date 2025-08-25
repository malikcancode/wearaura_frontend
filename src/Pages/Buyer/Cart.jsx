import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    updateCartItemSize,
  } = useContext(CartContext);

  const getSizesForProduct = (item) =>
    item.sizes && Array.isArray(item.sizes) && item.sizes.length > 0
      ? item.sizes
      : ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-[#effbdb] p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#10212b]">
        <FaShoppingCart /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10">
          <FaShoppingCart size={60} className="text-[#8fa464] mb-4" />
          <h2 className="text-xl font-semibold text-[#10212b]">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mt-2">
            Looks like you haven’t added anything yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-md overflow-hidden ">
            <table className="w-full">
              <thead className="bg-[#10212b] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-center">Size</th>
                  <th className="py-3 px-4 text-center">Price</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-center">Total</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={`${item.productId}-${item.variationId || ""}-${
                      item.size
                    }`}
                    className="border-b hover:bg-[#effbdb] transition"
                  >
                    <td className="py-4 px-4 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[100px] h-[100px] object-cover rounded-lg"
                      />
                      <span className="font-medium text-[#10212b]">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="border rounded px-2 py-1 text-sm bg-[#effbdb]">
                        {item.size}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-[#10212b]">
                      {item.price} $
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.productId,
                              item.variationId,
                              item.size
                            )
                          }
                          className="px-2 py-1 bg-[#effbdb] text-[#10212b] rounded hover:bg-[#d9e7b9]"
                        >
                          -
                        </button>
                        <span className="text-[#10212b]">{item.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.productId,
                              item.variationId,
                              item.size
                            )
                          }
                          className="px-2 py-1 bg-[#effbdb] text-[#10212b] rounded hover:bg-[#d9e7b9]"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-[#10212b]">
                      {item.price * item.quantity} $
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            item.variationId,
                            item.size
                          )
                        }
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-[#10212b]">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-[#10212b]">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
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
            <div>
              <Link
                to="/checkout"
                className="mt-6 block text-center bg-[#8fa464] text-[#10212b] cursor-pointer py-3 hover:bg-[#7c8f56] transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
