/* eslint-disable react/prop-types */
import Loading from "../../components/loading";
import { useGetAllFiltersQuery } from "../../redux/features/products/productsApi";

const SubcategoryFilter = ({ category, activeFilters, setFilters }) => {
  const { data, isLoading } = useGetAllFiltersQuery(category);
  if (isLoading) return <Loading />;

  const { sizes = [], colors = [], styles = [], priceRanges = [] } = data?.data || {};

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (key === "price") {
        updated.price =
          prev.price?.label === value.label ? null : { label: value.label, min: value.min, max: value.max };
      } else {
        const current = new Set(prev[key] || []);
        if (current.has(value)) {
          current.delete(value);
        } else {
          current.add(value);
        }
        updated[key] = [...current];
      }
      return updated;
    });
  };

  const handleClear = (key) => {
    setFilters((prev) => ({ ...prev, [key]: key === "price" ? null : [] }));
  };

  // ✅ Reusable Filter Card
  const FilterBox = ({ title, items, filterKey }) => (
    <div
      className="
        bg-white border rounded-xl shadow-sm p-4 
        flex flex-col justify-between 
        hover:shadow-md transition-all duration-300
        sm:min-h-[180px] 
      "
    >
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-3">{title}</h3>

        {/* 🔹 Scrollable area for many buttons (mobile friendly) */}
        <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto">
          {items.map((item, i) => {
            const isActive =
              filterKey === "price"
                ? activeFilters.price?.label === item.label
                : activeFilters[filterKey]?.includes(item);

            return (
              <button
                key={i}
                onClick={() =>
                  filterKey === "price"
                    ? handleFilterChange("price", item)
                    : handleFilterChange(filterKey, item)
                }
                className={`px-3 py-1.5 rounded-full border text-xs md:text-sm capitalize whitespace-nowrap transition-all 
                  ${
                    isActive
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                  }`}
              >
                {item.label || item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => handleClear(filterKey)}
          className="
            px-3 py-1.5 rounded-full bg-gradient-to-r from-[#b91c1c] to-[#f59e0b] 
            text-white text-xs md:text-sm 
            hover:opacity-90 transition-all
          "
        >
          Clear
        </button>
      </div>
    </div>
  );

  // ✅ Layout Grid (responsive)
  return (
    <section
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6
        mt-6
      "
    >
      {sizes.length > 0 && <FilterBox title="Size" items={sizes} filterKey="size" />}
      {colors.length > 0 && <FilterBox title="Color" items={colors} filterKey="color" />}
      {styles.length > 0 && <FilterBox title="Style" items={styles} filterKey="style" />}
      {priceRanges.length > 0 && <FilterBox title="Price" items={priceRanges} filterKey="price" />}
    </section>
  );
};

export default SubcategoryFilter;
