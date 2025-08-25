import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFilter } from "../Context/FilterContext";
import { useNavigate } from "react-router";
import { CartContext } from "../Context/CartContext";

const ProductGrid = () => {
  const { selectedCategory, selectedSize, selectedTags } = useFilter();
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const isInCart = (product) => {
    const selectedSize = selectedSizes[product._id] || product.sizes[0];
    return cartItems.some(
      (item) => item.productId === product._id && item.size === selectedSize
    );
  };

  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {};
        if (selectedCategory && selectedCategory !== "All Products")
          params.category = selectedCategory;
        if (selectedSize) params.size = selectedSize;
        if (selectedTags) params.tags = selectedTags;

        const res = await axios.get("http://localhost:5000/api/products", {
          params,
        });

        setProducts(res.data.products);
        // console.log(res);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSize, selectedTags]);

  if (loading) return <p className="text-center">Loading products...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (products.length === 0)
    return (
      <p className="text-center text-gray-500 py-10">
        No products found matching your filters.
      </p>
    );

  return (
    <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#EFFBDB] bg-white shadow hover:shadow-lg transition-all duration-300"
        >
          <div className="relative h-64 w-full overflow-hidden bg-[#EFFBDB] cursor-pointer">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="h-full w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            />
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 rounded-full bg-[#8FA464] px-3 py-1 text-xs font-medium text-white shadow-md">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Product Content */}
          <div className="flex flex-col flex-1 px-5 py-4">
            {/* Title */}
            <h5 className="text-lg font-semibold text-[#10212B] mb-1 truncate">
              {product.name}
            </h5>

            {/* Description */}
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              {product.salePrice &&
              product.salePrice < product.originalPrice ? (
                <>
                  <span className="text-lg font-bold text-[#8FA464]">
                    {product.salePrice} $
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice} $
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-[#8FA464]">
                  {product.originalPrice} $
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">
                Select Size
              </label>
              <select
                value={selectedSizes[product._id] || product.sizes[0]}
                onChange={(e) =>
                  setSelectedSizes((prev) => ({
                    ...prev,
                    [product._id]: e.target.value,
                  }))
                }
                onClick={(e) => e.stopPropagation()}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#8FA464] focus:outline-none"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const selectedSize =
                  selectedSizes[product._id] || product.sizes[0];

                if (isInCart(product)) {
                  removeFromCart(product._id, null, selectedSize);
                } else {
                  addToCart({
                    productId: product._id,
                    name: product.name,
                    image: `http://localhost:5000${product.image}`,
                    price:
                      product.salePrice &&
                      product.salePrice < product.originalPrice
                        ? product.salePrice
                        : product.originalPrice,
                    quantity: 1,
                    size: selectedSize,
                  });
                }
              }}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors ${
                isInCart(product)
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#10212B] hover:bg-[#8FA464]"
              }`}
            >
              {isInCart(product) ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 
            13l-2.293 2.293c-.63.63-.184 1.707.707 
            1.707H17m0 0a2 2 0 100 4 2 2 
            0 000-4zm-8 2a2 2 0 11-4 
            0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
