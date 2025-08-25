import React, { useEffect, useState } from "react";
import ProductVariations from "../../Components/ProductVariations";
import CreateProductInformation from "../../Components/CreateProductInformation";
import ImageUpload from "../../Components/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";

function CreateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    category: "",
    stock: "",
    color: "",
    sizes: [],
    tags: [],
    variations: [],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variationImages, setVariationImages] = useState({});
  const [variationImagePreviews, setVariationImagePreviews] = useState({});

  const categories = ["Shirts", "Pants", "Dresses", "Jackets"];

  const categorySizes = {
    Shirts: ["XS", "S", "M", "L", "XL", "XXL"],
    Jackets: ["XS", "S", "M", "L", "XL", "XXL"],
    Pants: ["28", "30", "32", "34", "36", "38", "40"],
    Dresses: ["XS", "S", "M", "L", "XL", "XXL"],
    Shoes: [
      "5",
      "5.5",
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12",
    ],
  };

  const allSizes = [...new Set(Object.values(categorySizes).flat())];

  const availableSizes = categorySizes[formData.category] ?? allSizes;

  const availableTags = ["Sale", "Featured", "New Arrivals", "Discount"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleVariationImageChange = (index, file) => {
    if (!file) return;
    setVariationImages((prev) => ({ ...prev, [index]: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setVariationImagePreviews((prev) => ({
        ...prev,
        [index]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeVariationImage = (index) => {
    setVariationImages((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
    setVariationImagePreviews((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      variations: [
        ...prev.variations,
        { name: "", price: "", stock: "", color: "" },
      ],
    }));
  };

  const removeVariation = (index) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index),
    }));
  };

  const handleVariationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variations: prev.variations.map((variation, i) =>
        i === index ? { ...variation, [field]: value } : variation
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("originalPrice", formData.originalPrice);
      submitData.append("salePrice", formData.salePrice);
      submitData.append("category", formData.category);
      submitData.append("stock", formData.stock);
      submitData.append("color", formData.color);
      submitData.append("sizes", JSON.stringify(formData.sizes));
      submitData.append("tags", JSON.stringify(formData.tags));

      const variationsToSend = formData.variations.map((v, idx) => {
        const { imagePreview, ...rest } = v;
        return rest;
      });
      submitData.append("variations", JSON.stringify(variationsToSend));

      if (image) {
        submitData.append("image", image);
      }
      Object.entries(variationImages).forEach(([idx, file]) => {
        submitData.append("variationImages", file);
      });

      const token = localStorage.getItem("userToken");

      let url = "http://localhost:5000/api/products/create";
      let method = "POST";
      if (id) {
        url = `http://localhost:5000/api/products/${id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        body: submitData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          description: "",
          originalPrice: "",
          salePrice: "",
          category: "",
          stock: "",
          color: "",
          sizes: [],
          tags: [],
          variations: [],
        });
        navigate("/admindashboard/products");
        setImage(null);
        setImagePreview(null);
        setVariationImages({});
        setVariationImagePreviews({});
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem("userToken");
          const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const product = await res.json();
          setFormData({
            name: product.name || "",
            description: product.description || "",
            originalPrice: product.originalPrice || "",
            salePrice: product.salePrice || "",
            category: product.category || "",
            stock: product.stock || "",
            color: product.color || "",
            sizes: product.sizes || [],
            tags: product.tags || [],
            variations: product.variations || [],
          });
          setImagePreview(
            product.image ? `http://localhost:5000${product.image}` : null
          );
        } catch (err) {
          alert("Failed to load product for editing.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-start">
          Create New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CreateProductInformation
            formData={formData}
            handleInputChange={handleInputChange}
            categories={categories}
          />

          <div className="bg-[#2c2545] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Original Price *
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <ImageUpload
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
          />

          <div className="bg-[#2c2545] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Available Sizes *</h2>

            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    formData.sizes.includes(size)
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-[#2c2545] border-gray-600 text-gray-300 hover:border-blue-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#2c2545] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>

            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    formData.tags.includes(tag)
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-[#2c2545] border-gray-600 text-gray-300 hover:border-green-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <ProductVariations
            handleVariationChange={handleVariationChange}
            removeVariation={removeVariation}
            formData={{
              ...formData,
              variations: formData.variations.map((v, idx) => ({
                ...v,
                imagePreview: variationImagePreviews[idx] || null,
              })),
            }}
            addVariation={addVariation}
            handleVariationImageChange={handleVariationImageChange}
            removeVariationImage={removeVariationImage}
          />
          <div className="flex w-full justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 w-full cursor-pointer rounded-md font-semibold text-lg transition-colors ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {loading
                ? id
                  ? "Updating Product..."
                  : "Creating Product..."
                : id
                ? "Update Product"
                : "Create Product"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
