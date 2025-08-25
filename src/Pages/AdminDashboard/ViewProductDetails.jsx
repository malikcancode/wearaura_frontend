import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function ViewProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getStatus = (stock) => {
    if (stock > 20) return { label: "In Stock", color: "bg-green-600" };
    if (stock > 0) return { label: "Low Stock", color: "bg-yellow-500" };
    return { label: "Out of Stock", color: "bg-red-600" };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        console.log(res);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/products/${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admindashboard/products");
    } catch (err) {
      alert("Failed to delete product. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!product)
    return (
      <div className="text-center mt-10 text-gray-400">Product not found.</div>
    );

  const status = getStatus(product.stock);

  return (
    <div className="text-white bg-[#1f1b2e] min-h-screen p-0">
      <h2 className="text-2xl font-bold mb-6">Product Details</h2>

      <div className="bg-[#23233D] rounded-2xl p-8 border border-[#2a2a2a] shadow-lg max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left - Image */}
        <div className="w-full h-96 bg-[#1f1f1f] rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Info */}
        <div className="flex flex-col justify-between">
          {/* Title + Category */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{product.category}</p>

            {/* Price & Stock */}
            <div className="flex items-center gap-4 mb-3">
              {product.salePrice &&
              product.salePrice < product.originalPrice ? (
                <>
                  <p className="text-xl font-bold text-[#00bcd4]">
                    {product.salePrice} $
                  </p>
                  <p className="text-sm line-through text-red-500">
                    {product.originalPrice} $
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-[#00bcd4]">
                  {product.originalPrice} $
                </p>
              )}
              <span
                className={`text-xs px-3 py-1 rounded-full text-white ${status.color}`}
              >
                {status.label}
              </span>
            </div>

            {/* Attributes */}
            <div className="space-y-1 text-sm text-gray-300">
              <p>
                <span className="font-semibold">Stock:</span> {product.stock}{" "}
                units
              </p>
              <p>
                <span className="font-semibold">Color:</span> {product.color}
              </p>
              <p>
                <span className="font-semibold">Sizes:</span>{" "}
                {product.sizes?.join(", ") || "N/A"}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              className="flex items-center gap-2 text-sm border border-[#3a3a3a] px-4 py-2 hover:bg-[#2e2e4d] transition"
              onClick={() =>
                navigate(`/admindashboard/create-product/${product._id}`)
              }
            >
              <FaEdit className="text-sm" />
              Edit
            </button>
            <button
              onClick={handleDeleteProduct}
              className="bg-red-600 text-white text-sm px-4 py-2 hover:bg-red-700 transition"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* Variations Section */}
      {product.variations && product.variations.length > 0 && (
        <div className="max-w-7xl mx-auto mt-10">
          <h3 className="text-xl font-bold mb-4">Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.variations.map((variation) => {
              const variationStatus = getStatus(variation.stock);
              return (
                <div
                  key={variation._id}
                  className="bg-[#23233D] rounded-xl p-6 border border-[#2a2a2a] shadow flex flex-col"
                >
                  <div className="w-full h-48 bg-[#1f1f1f] rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={`http://localhost:5000${variation.image}`}
                      alt={variation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {variation.name}
                  </h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Color: {variation.color}
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-md font-bold text-[#00bcd4]">
                      {variation.price} $
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full text-white ${variationStatus.color}`}
                    >
                      {variationStatus.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Stock: {variation.stock} units
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProductDetails;
