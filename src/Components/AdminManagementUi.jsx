import React from "react";
import { useNavigate } from "react-router";

function AdminManagementUi({
  heading,
  description,
  placeholder,
  onSearch,
  btnLabel,
  onBtnClick,
}) {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/admindashboard/createproduct");
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl mb-2 font-bold text-white">{heading}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        {btnLabel && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            onClick={onBtnClick || handleAddProduct}
          >
            {btnLabel}
          </button>
        )}
      </div>

      <div className="bg-[#1a1a2e] p-3 rounded-md border border-zinc-700 flex items-center justify-between">
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-500 w-full"
        />
        <button className="flex items-center gap-2 text-sm text-white hover:text-purple-300">
          <i className="bx bx-filter-alt text-lg"></i>
          Filters
        </button>
      </div>
    </div>
  );
}

export default AdminManagementUi;
