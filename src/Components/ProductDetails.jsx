import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariation, setSelectedVariation] = useState(null);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        console.log(res);
        setSelectedSize(res.data.sizes?.[0] || "");
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center">No product found</p>;

  const displayProduct = selectedVariation || product;
  const isInCart = cartItems.some(
    (item) =>
      item.productId === product._id &&
      item.variationId === displayProduct._id &&
      item.size === selectedSize
  );

  const sizeOptions = displayProduct.sizes || product.sizes || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* LEFT: Images */}
      <div className="flex flex-col gap-6">
        <div className="rounded-xl overflow-hidden border-2 border-[#8fa464] bg-[#effbdb] shadow-md">
          <img
            src={`http://localhost:5000${displayProduct.image}`}
            alt={displayProduct.name}
            className="w-full h-[380px] object-contain p-4"
          />
        </div>

        {/* Variation Thumbnails if available */}
        {product.variations?.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {product.variations.map((variation) => (
              <button
                key={variation._id}
                onClick={() => setSelectedVariation(variation)}
                className={`border-2 rounded-lg overflow-hidden p-2 transition ${
                  selectedVariation?._id === variation._id
                    ? "border-[#8fa464] bg-[#effbdb]"
                    : "border-gray-200 hover:border-[#8fa464]"
                }`}
              >
                <img
                  src={`http://localhost:5000${variation.image}`}
                  alt={variation.name}
                  className="w-full h-24 object-contain"
                />
                <p className="text-xs mt-1 text-center font-medium text-[#10212b]">
                  {variation.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Details */}
      <div className="flex flex-col gap-6">
        {/* Category & Name */}
        <div className="space-y-1">
          <p className="text-sm text-[#8fa464] font-medium uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-[#10212b]">
            {displayProduct.name}
          </h1>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          {displayProduct.salePrice ? (
            <>
              <p className="text-2xl font-semibold text-[#10212b]">
                {displayProduct.salePrice}$
              </p>
              <p className="text-[#8fa464] line-through">
                {displayProduct.originalPrice}$
              </p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-[#10212b]">
              {displayProduct.price ?? displayProduct.originalPrice}$
            </p>
          )}
        </div>

        {/* Sizes */}
        {sizeOptions.length > 0 && (
          <div>
            <p className="mb-2 font-medium text-[#10212b]">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    size === selectedSize
                      ? "bg-[#8fa464] text-white border-[#8fa464]"
                      : "bg-[#effbdb] text-[#10212b] border-[#8fa464] hover:bg-[#8fa464] hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <p className="font-medium text-[#10212b]">Quantity</p>
          <div className="flex items-center border border-[#8fa464] rounded-full overflow-hidden bg-[#effbdb]">
            <button
              className="p-2 px-3 hover:bg-[#8fa464] hover:text-white transition"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <FaMinus />
            </button>
            <span className="px-4 py-1 text-[#10212b] font-semibold">
              {quantity}
            </span>
            <button
              className="p-2 px-3 hover:bg-[#8fa464] hover:text-white transition"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="mt-4 w-full">
          {isInCart ? (
            <button
              onClick={() =>
                removeFromCart(product._id, displayProduct._id, selectedSize)
              }
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-3 cursor-pointer hover:bg-red-700 transition"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  productId: product._id,
                  variationId: displayProduct._id,
                  name: displayProduct.name,
                  image: `http://localhost:5000${displayProduct.image}`,
                  price:
                    displayProduct.salePrice ??
                    displayProduct.price ??
                    displayProduct.originalPrice,
                  quantity,
                  size: selectedSize,
                })
              }
              className="w-full flex items-center justify-center gap-2 bg-[#10212b] text-white font-medium py-3 cursor-pointer hover:bg-[#8fa464] transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-lg font-semibold mb-2 text-[#10212b]">
            Description & Fit
          </p>
          <p className="text-sm text-[#10212b]/80 leading-relaxed">
            {displayProduct.description || product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
