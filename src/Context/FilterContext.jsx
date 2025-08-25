import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTags, setSelectedTags] = useState("");

  const updateCategory = (category) => setSelectedCategory(category);
  const updateSize = (size) => setSelectedSize(size);
  const updateTags = (tags) => setSelectedTags(tags);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        selectedSize,
        selectedTags,
        updateCategory,
        updateSize,
        updateTags,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
