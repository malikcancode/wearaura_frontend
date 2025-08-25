import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import AdminManagementUi from "../../Components/AdminManagementUi";
import { useNavigate } from "react-router";

function getStatus(stock) {
  if (stock === 0) return { label: "Out of Stock", color: "bg-[#dc4c64]" };
  if (stock <= 5) return { label: "Low Stock", color: "bg-[#f5a524]" };
  return { label: "Active", color: "bg-[#22c55e]" };
}

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="text-white bg-[#1f1b2e] min-h-screen">
      <AdminManagementUi
        heading="Products Management"
        description="Manage your product catalog, inventory, and pricing."
        placeholder="Search products by name or category..."
        btnLabel="Create Product"
        onSearch={setSearch}
      />

      {loading ? (
        <p className="text-center mt-10 text-gray-400">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredProducts.map((product) => {
              const status = getStatus(product.stock);

              return (
                <div
                  key={product._id}
                  className="bg-[#23233D] rounded-2xl p-5 border border-[#1f1f1f] flex flex-col justify-between shadow-lg hover:shadow-[#1f1f1f]/50 transition"
                >
                  <div className="w-full h-48 bg-[#1f1f1f] rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">{product.category}</p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center justify-center gap-2">
                        {product.salePrice &&
                        product.salePrice < product.originalPrice ? (
                          <>
                            <p className="text-[13px] font-semibold text-[#00bcd4]">
                              {product.salePrice} $
                            </p>
                            <p className="text-[12px] line-through text-red-500">
                              {product.originalPrice} $
                            </p>
                          </>
                        ) : (
                          <p className="text-[13px] font-semibold text-[#00bcd4]">
                            {product.originalPrice} $
                          </p>
                        )}
                      </div>

                      <span
                        className={`text-[11px] px-2 py-1 rounded-full text-white ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mt-1">
                      Stock: {product.stock} units
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2a2a2a]">
                    <button
                      className="flex items-center border gap-2 text-xs text-white bg-[#23233D] px-3 py-2 rounded-lg"
                      onClick={() =>
                        navigate(
                          `/admindashboard/create-product/${product._id}`
                        )
                      }
                    >
                      <FaEdit className="text-xs" />
                      Edit
                    </button>
                    <div className="relative">
                      <button
                        type="button"
                        className="text-gray-500 text-xl cursor-pointer font-bold"
                        onClick={() =>
                          setOpenDropdown((prev) =>
                            prev === product._id ? null : product._id
                          )
                        }
                      >
                        ...
                      </button>

                      {openDropdown === product._id && (
                        <div className="absolute right-0 top-8 z-10 w-40 bg-[#1f1f1f] border border-gray-700 rounded-md shadow-lg">
                          <button
                            onClick={() => {
                              setOpenDropdown(null);
                              navigate(
                                `/admindashboard/view-details/${product._id}`
                              );
                            }}
                            className="block w-full px-2 py-2 text-left text-xs text-white hover:bg-gray-700"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteProduct(product._id);
                              setOpenDropdown(null);
                            }}
                            className="block w-full px-2 py-2 text-left text-xs text-red-500 hover:bg-red-600 hover:text-white"
                          >
                            Delete Product
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500 mt-6">
                No products found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
