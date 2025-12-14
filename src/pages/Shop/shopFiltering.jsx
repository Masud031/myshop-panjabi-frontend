/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
  showCategory = true,
}) => {
  const [openSizeSection, setOpenSizeSection] = useState(true);
  const [categorySizes, setCategorySizes] = useState([]);

console.log("filters test", filters,);


const { categories, colors, sizesMap,  styleCategories, } = filters;
  // Predefined category → sizes map
//  const categorySizeMap = {
//     "kids-panjabi": [20, 22, 24, 26, 28, 30, 32, 34, 36],
//     "panjabi": [38, 40, 42, 44, 46,],
//     "big-size": [46, 48, 50],
//     "sheroany": [38,40,42,44,46],
//     "trending": [38,40,42,44,46],
//     "payjama": [38,40,42,44],
//     "koti": [36,38,40,42,44,46],
//      "kids-sheroany": [24,26,28,30,32,34,36],
   
//   };
    


  // Update sizes when category changes
  // useEffect(() => {
  //   const cat = filtersState.category?.toLowerCase();
  //   const sizes = categorySizeMap[cat] || [];
  //   setCategorySizes(sizes);
  //   setOpenSizeSection(sizes.length > 0);
  //   // Reset selected size when category changes
  //   setFiltersState((prev) => ({ ...prev, size: "" }));
  // }, [filtersState.category]);
 useEffect(() => {
  const cat = filtersState.category?.toLowerCase();
  const sizes = sizesMap?.[cat] || [];

  setCategorySizes(sizes);
  setOpenSizeSection(sizes.length > 0);

  // Reset size ONLY when category actually changes
  setFiltersState(prev => {
    if (prev.category !== filtersState.category) {
      return { ...prev, size: "" };
    }
    return prev;
  });
}, [filtersState.category, sizesMap]);

// ///
    const handleChange = (key, value) => {
        console.log("➡️ handleChange triggered", { key, value });
    setFiltersState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-5 flex-shrink-0 w-60">
      <h3 className="text-xl font-semibold">Filters</h3>

      {/* Category */}
        {showCategory && categories?.length > 0 && (
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
          {categories.map(cat => (
            <label key={cat} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filtersState.category === cat}
                onChange={() => handleChange("category", cat)}
              />
              <span className="ml-1">{cat}</span>
            </label>
          ))}
        </div>
      )}

      {/* Sizes */}
         {categorySizes.length > 0 && (
        <div className="flex flex-col space-y-2">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setOpenSizeSection(!openSizeSection)}
          >
            <h4 className="font-medium text-lg">Size</h4>
            <span className="text-sm">{openSizeSection ? "▲" : "▼"}</span>
          </div>
          <hr />
          {openSizeSection && categorySizes.map(size => (
            <label key={size} className="cursor-pointer">
              <input
                type="radio"
                name="size"
                value={size}
                checked={String(filtersState.size) === String(size)}
                onChange={() => handleChange("size", size)}
              />
              <span className="ml-1 uppercase">{size}</span>
            </label>
          ))}
        </div>
      )}

      {/* Colors */}
           {colors?.length > 0 && (
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Colors</h4>
          <hr />
          {colors.map(color => (
            <label key={color} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filtersState.color === color}
                onChange={() => handleChange("color", color)}
              />
              <span className="ml-1">{color}</span>
            </label>
          ))}
        </div>
      )}


      {/* TEMP Style Category (always visible like Colors2) */}
 {styleCategories?.length > 0 && (
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Style Category</h4>
          <hr />
          {styleCategories.map(sc => (
            <label key={sc} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="styleCategory"
                value={sc}
                checked={filtersState.styleCategory === sc}
                onChange={() => 
                  
                  handleChange("styleCategory", sc)}
              />
              <span className="ml-1">{sc}</span>
            </label>
          ))}
        </div>
      )}




      {/* Price Range */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range, idx) => {
          const val = `${range.min}-${range.max ?? ""}`.replace(/-$/, "");
          return (
            <label key={idx} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={val}
                checked={filtersState.priceRange === val}
                onChange={(e) =>
                  setFiltersState({ ...filtersState, priceRange: e.target.value })
                }
              />
              <span className="ml-1">{range.label}</span>
            </label>
          );
        })}
      </div>

      <button
        onClick={clearFilters}
        className="bg-primary py-1 px-4 text-white rounded hover:bg-primary-dark"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
