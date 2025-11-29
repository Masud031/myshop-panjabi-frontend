/* eslint-disable react/prop-types */
/* MobileShopFiltering.jsx */
import { useState, useEffect } from "react";

export default function MobileShopFiltering({
  filters = { categories: [], colors: [], priceRanges: [], sizesMap: {} },
  filtersState,
  setFiltersState,
}) {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    if (filtersState.category && filters.sizesMap) {
      const key = filtersState.category.toLowerCase().replace(/\s+/g, "-");
      setAvailableSizes(filters.sizesMap[key] || []);
    } else {
      setAvailableSizes([]);
    }
  }, [filtersState.category, filters.sizesMap]);

  const toggleColor = (color) => {
    setFiltersState((prev) => {
      const cur = prev.color || [];
      return {
        ...prev,
        color: cur.includes(color) ? cur.filter((c) => c !== color) : [color],
      };
    });
  };

  return (
    <div className="md:hidden space-y-3">
      {/* Categories */}
      <div>
        <button
          onClick={() => setOpenCategory(!openCategory)}
          className="w-full bg-gradient-to-r from-red-600 to-yellow-400 text-white font-semibold py-2 rounded-lg"
        >
          Categories
        </button>

        {openCategory && (
          <div className="mt-2 space-y-1 bg-gray-100 p-2 rounded-lg">
            {filters.categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltersState({ ...filtersState, category: cat, size: "" })}
                className={`w-full text-left px-2 py-1 rounded ${
                  filtersState.category === cat ? "bg-red-500 text-white" : "bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      {availableSizes.length > 0 && (
        <div>
          <button
            onClick={() => setOpenSize(!openSize)}
            className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold py-2 rounded-lg"
          >
            Sizes
          </button>

          {openSize && (
            <div className="mt-2 flex flex-wrap gap-2">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() =>
                    setFiltersState((prev) => ({ ...prev, size: prev.size === String(sz) ? "" : String(sz) }))
                  }
                  className={`px-3 py-1 rounded-full font-medium border-2 ${
                    String(filtersState.size) === String(sz) ? "bg-green-500 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Colors */}
      <div>
        <button
          onClick={() => setOpenColor(!openColor)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold py-2 rounded-lg"
        >
          Colors
        </button>

        {openColor && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.colors?.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`px-3 py-1 rounded-full font-medium border-2 ${
                  (filtersState.color || []).includes(color) ? "bg-purple-500 text-white" : "bg-white border-gray-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          onClick={() => setOpenPrice(!openPrice)}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-2 rounded-lg"
        >
          Price
        </button>

        {openPrice && (
          <div className="mt-2 flex flex-col gap-1">
            {filters.priceRanges?.map((price) => {
              const value = `${price.min}-${price.max ?? ""}`.replace(/-$/, "");
              return (
                <button
                  key={price.label}
                  onClick={() =>
                    setFiltersState((prev) => ({ ...prev, priceRange: prev.priceRange === value ? "" : value }))
                  }
                  className={`px-3 py-1 rounded-full font-medium border-2 ${
                    filtersState.priceRange === value ? "bg-yellow-500 text-white" : "bg-white border-gray-300"
                  }`}
                >
                  {price.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
