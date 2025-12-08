/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "../../components/loading";
import { useGetAllFiltersQuery } from "../../redux/features/products/productsApi";

export default function SubcategoryFilter({ category, activeFilters, setFilters }) {
  const { data, isLoading } = useGetAllFiltersQuery(category);

  const [openMobile, setOpenMobile] = useState({
    size: false,
    color: false,
    style: false,
    price: false,
    styleCategory: false,
  });

  if (isLoading) return <Loading />;

  const {
    sizes = [],
    colors = [],
    styles = [],
    priceRanges = [],
    styleCategories = [],
  } = data?.data || {};

  // Utility: get stable primitive for an item (works whether item is string or {label, value})
  const getItemValue = (item) => {
    if (item == null) return item;
    if (typeof item === "string" || typeof item === "number") return item;
    // prefer value, fallback to label, fallback to stringified item
    return item.value ?? item.label ?? String(item);
  };

  // -----------------------
  // Update Filter Logic
  // -----------------------
const handleFilterChange = (key, item) => {
  const val = getItemValue(item);

  setFilters((prev) => {
    const updated = { ...prev };

    if (key === "price") {
      updated.price = prev.price?.label === item.label ? null : item;
    } else {
      const currentSet = new Set(prev[key] || []);
      if (currentSet.has(val)) currentSet.delete(val);
      else currentSet.add(val);
      updated[key] = [...currentSet]; // always an array
    }

    console.log("Updated filters:", updated);
    return updated;
  });
};



  const handleClear = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === "price" ? null : [],
    }));
  };

  // -----------------------
  // Desktop Filter Box
  // -----------------------
  const FilterBox = ({ title, items, filterKey }) => (
    
    <div className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
        {items.map((item, i) => {
          const val = getItemValue(item);
          const label = item?.label ?? item;
          
          const isActive =
            filterKey === "price"
              ? activeFilters.price?.label === item.label
              : (activeFilters[filterKey] || []).includes(val);

          return (
            <button
              key={i}
              onClick={() => handleFilterChange(filterKey, item)}
              className={`px-3 py-1.5 rounded-full border text-sm capitalize whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-red-700 to-yellow-500 text-white border-transparent shadow-md scale-[1.05]"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-right">
        <button
          onClick={() => handleClear(filterKey)}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-yellow-400 text-white text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );

  // -----------------------
  // Mobile Accordion
  // -----------------------
  const MobileAccordion = ({ title, items, filterKey }) => (
    <div className="border rounded-xl p-3 bg-gray-50">
      <button
        onClick={() =>
          setOpenMobile((prev) => ({
            ...prev,
            [filterKey]: !prev[filterKey],
          }))
        }
        className="w-full flex justify-between items-center text-left font-semibold text-white 
          bg-gradient-to-r from-red-600 via-black-500 to-yellow-500 px-4 py-2 rounded-xl
          shadow-md hover:opacity-90 transition-all"
      >
        {title}
        <span>{openMobile[filterKey] ? "▲" : "▼"}</span>
      </button>

      {openMobile[filterKey] && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, i) => {
            const val = getItemValue(item);
            const label = item?.label ?? item;
            const isActive =
              filterKey === "price"
                ? activeFilters.price?.label === item.label
                : (activeFilters[filterKey] || []).includes(val);

            return (
              <button
                key={i}
                onClick={() => handleFilterChange(filterKey, item)}
                className={`px-3 py-1.5 rounded-full border text-sm capitalize
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                {label}
              </button>
            );
          })}

          <button
            onClick={() => handleClear(filterKey)}
            className="mt-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-yellow-400 text-white text-sm"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );

  // -----------------------
  // RETURN UI
  // -----------------------
  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden space-y-4 mt-4">
        {sizes.length > 0 && (
          <MobileAccordion title="Size" items={sizes} filterKey="size" />
        )}
        {colors.length > 0 && (
          <MobileAccordion title="Color" items={colors} filterKey="color" />
        )}
        {styles.length > 0 && (
          <MobileAccordion title="Style" items={styles} filterKey="style" />
        )}
        {styleCategories.length > 0 && (
          <MobileAccordion
            title="Style Category"
            items={styleCategories}
            filterKey="styleCategory"
          />
        )}
        {priceRanges.length > 0 && (
          <MobileAccordion title="Price" items={priceRanges} filterKey="price" />
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {sizes.length > 0 && (
          <FilterBox title="Size" items={sizes} filterKey="size" />
        )}
        {colors.length > 0 && (
          <FilterBox title="Color" items={colors} filterKey="color" />
        )}
        {styles.length > 0 && (
          <FilterBox title="Style" items={styles} filterKey="style" />
        )}
        {styleCategories.length > 0 && (
          <FilterBox
            title="Style Category"
            items={styleCategories}
            filterKey="styleCategory"
          />
        )}
        {priceRanges.length > 0 && (
          <FilterBox title="Price" items={priceRanges} filterKey="price" />
        )}
      </div>
    </>
  );
}
