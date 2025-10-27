import { useParams } from "react-router-dom";
import { useGetAllFilterProductsQuery } from "../../../redux/features/products/productsApi";
import SubcategoryFilter from "../SubcategoryFilter";
import Loading from "../../../components/loading";
import ProductCards from "../../Shop/productCards";
import { useState, useMemo } from "react";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const [filters, setFiltersState] = useState({
    size: [],
    color: [],
    style: [],
    price: null,
  });

  // 🧮 useMemo ensures query object is stable between renders
  const filtersQuery = useMemo(
    () => ({
      category: categoryName,
      size: filters.size,
      color: filters.color,
      style: filters.style,
      price: filters.price,
      page: 1,
      limit: 8,
    }),
    [categoryName, filters]
  );

  // 🔁 Auto re-fetches whenever filtersQuery changes
  const { data, isLoading } = useGetAllFilterProductsQuery(filtersQuery);

  const products = data?.data || [];

  // Handle filter selection
  const handleFilterChange = (key, value) => {
    setFiltersState((prev) => {
      if (key === "price")
        return { ...prev, price: prev.price?.label === value.label ? null : value };

      const current = prev[key];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  // Reset all filters at once (optional)
  const clearAllFilters = () => {
    setFiltersState({ size: [], color: [], style: [], price: null });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="section__container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold capitalize">Shop {categoryName}</h1>
        <button
          onClick={clearAllFilters}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-full"
        >
          Clear All
        </button>
      </div>

      <SubcategoryFilter
        category={categoryName}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
        setFilters={setFiltersState}
      />

      <div className="mt-6">
        {products.length > 0 ? (
          <ProductCards products={products} />
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products found for selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
