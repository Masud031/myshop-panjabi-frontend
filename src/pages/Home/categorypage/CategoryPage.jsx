/* eslint-disable no-unused-vars */
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
    styleCategory: [], // <-- added
    price: null,
    page: 1,
    limit: 24,
  });

  // build query for backend. Map styleCategory into style param (or send separately if backend supports)
  const filtersQuery = useMemo(
    () => ({
      category: categoryName,
      size: filters.size,
      color: filters.color,
      style: filters.style, // existing style filter
     styleCategory: filters.styleCategory,
    
      priceMin: filters.price?.min ?? undefined,
      priceMax: filters.price?.max ?? undefined,
      page: filters.page || 1,
      limit: filters.limit || 24,
    }),
    [categoryName, filters]
  );

  // ensure hook re-fetches when filtersQuery changes
  const { data, isLoading } = useGetAllFilterProductsQuery(filtersQuery);

  const products = data?.data || [];

  // you can keep a local handler (optional) or pass setFiltersState directly
  const handleFilterChange = (key, value) => {
    setFiltersState((prev) => {
      if (key === "price") {
        return { ...prev, price: prev.price?.label === value.label ? null : value, page: 1 };
      }

      const current = prev[key] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: updated, page: 1 };
    });
  };

  const clearAllFilters = () => {
    setFiltersState({ size: [], color: [], style: [], styleCategory: [], price: null, page: 1, limit: 24 });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="section__container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold capitalize">Shop {categoryName}</h1>
        <button
          onClick={clearAllFilters}
          className="mt-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-yellow-400 text-white text-sm"
        >
          Clear All
        </button>
      </div>

      <SubcategoryFilter
        category={categoryName}
        // you can either pass setFilters (we use it in SubcategoryFilter) or pass a callback
        activeFilters={filters}
        setFilters={setFiltersState}
        // if you prefer: onFilterChange={handleFilterChange}
      />

      <div className="mt-6">
        {products.length > 0 ? (
          <>
            <ProductCards products={products} />

            {data?.data?.hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() =>
                    setFiltersState((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
                  }
                  className="bg-primary hover:bg-primary-color-dark text-white px-6 py-2 rounded-full transition"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products found for selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
