/* eslint-disable react/prop-types */
import Loading from "../../components/loading";
import { useGetAllFiltersQuery } from "../../redux/features/products/productsApi";

const SubcategoryFilter = ({ category, activeFilters, setFilters }) => {
  const { data, isLoading } = useGetAllFiltersQuery(category);
  if (isLoading) return <Loading />;

  const { sizes = [], colors = [], styles = [], priceRanges = [] } = data?.data || {};

  // ✅ Handles all filter changes (price, color, size, style)
  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (key === "price") {
        // Price is an object { label, min, max }
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

  // ✅ Clear one specific filter group
  const handleClear = (key) => {
    setFilters((prev) => ({ ...prev, [key]: key === "price" ? null : [] }));
  };

  // ✅ Reusable filter UI box
  const FilterBox = ({ title, items, filterKey }) => (
    <div className="bg-white border rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>

        <div className="flex flex-wrap gap-2">
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
                className={`px-3 py-1.5 rounded-full border text-sm capitalize transition-all ${
                  isActive
                    ? "bg-black text-white border-black shadow"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
              >
                {item.label || item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear button at bottom-right */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => handleClear(filterKey)}
          className="px-4 py-2 rounded-full bg-primary text-white text-sm hover:bg-blue-700 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );

  // ✅ Layout grid for all filter types
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {sizes.length > 0 && <FilterBox title="Size" items={sizes} filterKey="size" />}
      {colors.length > 0 && <FilterBox title="Color" items={colors} filterKey="color" />}
      {styles.length > 0 && <FilterBox title="Style" items={styles} filterKey="style" />}
      {priceRanges.length > 0 && <FilterBox title="Price" items={priceRanges} filterKey="price" />}
    </section>
  );
};

export default SubcategoryFilter;
