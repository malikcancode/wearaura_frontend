import React from "react";
import { FiPlus, FiMinusCircle, FiUpload, FiX } from "react-icons/fi";
import ImageUpload from "./ImageUpload";

function ProductVariations({
  addVariation,
  formData,
  removeVariation,
  handleVariationChange,
  handleVariationImageChange,
  removeVariationImage,
}) {
  return (
    <div className="bg-[#2c2545] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product Variations</h2>
        <button
          type="button"
          onClick={addVariation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Variation
        </button>
      </div>

      {formData.variations.map((variation, index) => (
        <div key={index} className="border border-gray-600 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Variation {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeVariation(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FiMinusCircle size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={variation.name}
                onChange={(e) =>
                  handleVariationChange(index, "name", e.target.value)
                }
                className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Variation name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={variation.price}
                onChange={(e) =>
                  handleVariationChange(index, "price", e.target.value)
                }
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                value={variation.stock}
                onChange={(e) =>
                  handleVariationChange(index, "stock", e.target.value)
                }
                min="0"
                className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="text"
                value={variation.color}
                onChange={(e) =>
                  handleVariationChange(index, "color", e.target.value)
                }
                className="w-full px-3 py-2 bg-[#2c2545] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Color"
              />
            </div>
          </div>

          <div className="mt-4">
            <ImageUpload
              index={index}
              imagePreview={variation.imagePreview}
              handleImageChange={handleVariationImageChange}
              removeImage={removeVariationImage}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductVariations;
