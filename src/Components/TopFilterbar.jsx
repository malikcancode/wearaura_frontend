import { useFilter } from "../Context/FilterContext";

const TopFilterbar = () => {
  const {
    selectedCategory,
    selectedSize,
    selectedTags,
    updateCategory,
    updateSize,
    updateTags,
  } = useFilter();

  const categories = ["All Products", "Shirts", "Pants", "Dresses", "Jackets"];
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
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
  ];
  const tags = ["Sale", "Featured", "New Arrivals"];

  return (
    <div className="flex flex-wrap justify-end gap-4 px-4 mb-6">
      <div className="flex items-center space-x-2">
        <label className="font-semibold text-[#10212B]">Category:</label>
        <select
          className="border border-[#8FA464] bg-[#EFFBDB] px-3 py-1 text-sm text-[#10212B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FA464]"
          value={selectedCategory}
          onChange={(e) => updateCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-semibold text-[#10212B]">Size:</label>
        <select
          className="border border-[#8FA464] bg-[#EFFBDB] px-3 py-1 text-sm text-[#10212B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FA464]"
          value={selectedSize}
          onChange={(e) => updateSize(e.target.value)}
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="font-semibold text-[#10212B]">Tags:</label>
        <select
          className="border border-[#8FA464] bg-[#EFFBDB] px-3 py-1 text-sm text-[#10212B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8FA464]"
          value={selectedTags}
          onChange={(e) => updateTags(e.target.value)}
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TopFilterbar;
