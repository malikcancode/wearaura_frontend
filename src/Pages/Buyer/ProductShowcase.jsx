import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

const ProductShowcase = () => {
  const [product, setProduct] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("");

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products?tag=Featured"
        );

        if (res.data.products && res.data.products.length > 0) {
          setProduct(res.data.products[0]);
          setSelectedSize(res.data.products[0].sizes?.[0] || "");
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching featured product:", err);
        setProduct(null);
      }
    };

    fetchFeatured();
  }, []);

  if (!product) {
    return null;
  }

  return (
    <section className="py-16 bg-[#EFFBDB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <img
                src={`http://localhost:5000${product.image}`}
                className="w-full h-80 lg:h-96 object-cover rounded-xl"
                alt={product.name}
              />
            </div>

            <div className="absolute top-4 left-4 bg-[#10212B] text-white rounded-lg px-4 py-2 shadow-lg">
              <span className="font-semibold text-lg">
                ${product.salePrice ?? product.originalPrice}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-[#8FA464] text-white text-xs px-3 py-1 rounded-full">
                Featured Product
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#10212B] leading-tight">
                Discover Our Exclusive Featured Product
              </h2>

              <p className="text-[#10212B]/80 text-lg leading-relaxed">
                Experience the perfect blend of style and quality. Our featured
                product is carefully selected to offer you the best in design,
                durability, and comfort.
              </p>
            </div>
            {product.sizes?.length > 0 && (
              <div className="mb-2">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {isInCart(product._id) ? (
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-red-600 text-white px-8 py-3 hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <i className="bx bx-shopping-bag"></i>
                  <span>Remove from Cart</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    addToCart({
                      id: product._id,
                      name: product.name,
                      image: `http://localhost:5000${product.image}`,
                      price:
                        product.salePrice &&
                        product.salePrice < product.originalPrice
                          ? product.salePrice
                          : product.originalPrice,
                      quantity: 1,
                      size: selectedSize,
                    })
                  }
                  className="bg-[#8FA464] text-white px-8 py-3 hover:bg-[#10212B] transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <i className="bx bx-shopping-bag"></i>
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
