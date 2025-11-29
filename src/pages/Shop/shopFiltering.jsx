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

  // Predefined category → sizes map
 const categorySizeMap = {
    "kids-panjabi": [20, 22, 24, 26, 28, 30, 32, 34, 36],
    "panjabi": [38, 40, 42, 44, 46,],
    "big-size": [46, 48, 50],
    "sheroany": [38,40,42,44,46],
    "trending": [38,40,42,44,46],
    "payjama": [38,40,42,44],
    "koti": [36,38,40,42,44,46],
     "kids-sheroany": [24,26,28,30,32,34,36],
   
  };

  // Update sizes when category changes
  useEffect(() => {
    const cat = filtersState.category?.toLowerCase();
    const sizes = categorySizeMap[cat] || [];
    setCategorySizes(sizes);
    setOpenSizeSection(sizes.length > 0);
    // Reset selected size when category changes
    setFiltersState((prev) => ({ ...prev, size: "" }));
  }, [filtersState.category]);

  return (
    <div className="space-y-5 flex-shrink-0 w-60">
      <h3 className="text-xl font-semibold">Filters</h3>

      {/* Category */}
      {showCategory && (
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
          {filters.categories.map((category) => (
            <label key={category} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filtersState.category === category}
                onChange={(e) =>
                  setFiltersState({
                    ...filtersState,
                    category: e.target.value,
                  })
                }
              />
              <span className="ml-1">{category}</span>
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
          {openSizeSection &&
            categorySizes.map((size) => (
              <label key={size} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={String(filtersState.size) === String(size)}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, size: e.target.value })
                  }
                />
                <span className="ml-1 uppercase">{size}</span>
              </label>
            ))}
        </div>
      )}

      {/* Colors */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

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
