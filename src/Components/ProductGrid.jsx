import { useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from "../Context/FilterContext";

const ProductGrid = () => {
  const { selectedCategory, selectedSize } = useFilter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {};
        if (selectedCategory && selectedCategory !== "All Products")
          params.category = selectedCategory;
        if (selectedSize) params.size = selectedSize;

        const res = await axios.get("http://localhost:5000/api/products", {
          params,
        });

        setProducts(res.data.products);
      } catch (error) {
        setError("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSize]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-2xl p-4 group flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative mb-4">
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-4 space-y-1">
              <h4 className="text-[#3B2F27] font-semibold text-lg truncate">
                {product.name}
              </h4>
              <p className="text-[#3B2F27] text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-xs text-[#A0A0A0] uppercase tracking-wide">
                {product.category}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <div className="pt-3">
                <span className="text-[#3B2F27] font-bold text-lg">
                  {product.price} Pkr
                </span>
              </div>
              <button className="bg-[#5A463A] text-white p-2 rounded-md hover:bg-[#4a3a2e] transition-colors">
                <i className="bx bx-shopping-bag text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
