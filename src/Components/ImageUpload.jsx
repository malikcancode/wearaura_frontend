import React from "react";
import { FiUpload, FiX } from "react-icons/fi";

function ImageUpload({ imagePreview, handleImageChange, removeImage, index }) {
  const inputId =
    index !== undefined ? `variation-image-${index}` : "image-upload";

  return (
    <div className="mt-4">
      {imagePreview ? (
        <div className="relative w-52 h-52 border-2 border-gray-600 rounded-lg overflow-hidden shadow-lg group">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1.5 rounded-full text-white shadow-md transition"
            title="Remove Image"
          >
            <FiX size={18} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center gap-2 w-52 h-52 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-colors text-gray-400"
        >
          <FiUpload size={28} />
          <span className="text-sm">Click to upload</span>
          <input
            type="file"
            accept="image/*"
            id={inputId}
            onChange={(e) =>
              index !== undefined
                ? handleImageChange(index, e.target.files[0])
                : handleImageChange(e)
            }
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

export default ImageUpload;
