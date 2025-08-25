import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";

const CategoryProductsPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [selectedSizes, setSelectedSizes] = useState({});

  const isInCart = (product) =>
    cartItems.some(
      (item) =>
        item.productId === product._id &&
        item.size === (selectedSizes[product._id] || product.sizes?.[0] || null)
    );

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          `http://localhost:5000/api/products?category=${categoryName}`
        );
        setProducts(res.data.products);
      } catch (err) {
        setError("Error fetching category products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <section className="py-16 bg-[#EFFBDB] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#10212B] mb-8">
          {categoryName} Collection
        </h2>

        {/* Loading / Error / Products */}
        {loading ? (
          <p className="text-center text-[#10212B]">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#8FA464]/30 bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-[#EFFBDB] cursor-pointer">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 rounded-full bg-[#8FA464] px-3 py-1 text-xs font-medium text-[#10212B] shadow-md">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 py-4">
                  {/* Name */}
                  <h5 className="text-lg font-semibold text-[#10212B] mb-1 truncate">
                    {product.name}
                  </h5>

                  {/* Description */}
                  <p className="text-sm text-[#10212B]/70 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    {product.salePrice &&
                    product.salePrice < product.originalPrice ? (
                      <>
                        <span className="text-lg font-bold text-[#8FA464]">
                          {product.salePrice}$
                        </span>
                        <span className="text-sm text-[#10212B]/60 line-through">
                          {product.originalPrice}$
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-[#10212B]">
                        {product.originalPrice}$
                      </span>
                    )}
                  </div>

                  {/* Size Selector */}
                  {Array.isArray(product.sizes) && product.sizes.length > 0 && (
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
                  )}
                  <button
                    onClick={() => {
                      const selectedSize =
                        selectedSizes[product._id] ||
                        product.sizes?.[0] ||
                        null;

                      if (isInCart(product)) {
                        removeFromCart(product._id, null, selectedSize); // pass productId & size
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
                        : "bg-[#10212B] hover:bg-[#8FA464] hover:text-[#10212B]"
                    }`}
                  >
                    {isInCart(product) ? "Remove" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#10212B]">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryProductsPage;
