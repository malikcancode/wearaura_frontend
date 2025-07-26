import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedSize, setSelectedSize] = useState("");

  const updateCategory = (category) => setSelectedCategory(category);
  const updateSize = (size) => setSelectedSize(size);

  return (
    <FilterContext.Provider
      value={{ selectedCategory, selectedSize, updateCategory, updateSize }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
