import { useFilter } from "../Context/FilterContext";

const TopFilterbar = () => {
  const { selectedCategory, selectedSize, updateCategory, updateSize } =
    useFilter();

  const categories = [
    "All Products",
    "Shirts",
    "Pants",
    "Dresses",
    "Jackets",
    "Shoes",
    "New Arrivals",
    "Sale",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32"];

  return (
    <div className="flex flex-wrap justify-end gap-4 px-4 mb-6">
      <div className="flex items-center space-x-2">
        <label className="font-semibold text-[#3b2f27]">Category:</label>
        <select
          className="border px-3 py-1 text-sm text-[#3b2f27]"
          value={selectedCategory}
          onChange={(e) => updateCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-semibold text-[#3b2f27]">Size:</label>
        <select
          className="border px-3 py-1 text-sm text-[#3b2f27]"
          value={selectedSize}
          onChange={(e) => updateSize(e.target.value)}
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TopFilterbar;
