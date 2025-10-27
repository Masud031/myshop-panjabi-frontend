import { useState } from "react";
import ProductCards from "../../../src/pages/Shop/productCards";
import ShopFiltering from "../../../src/pages/Shop/shopFiltering";
import Loading from "../../components/loading";
import {
  useGetAllProductsQuery,
  useGetAllFiltersQuery,
} from "../../redux/features/products/productsApi";

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const queryParams = {
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: 8,
  };

  // ✅ Fetch all products
  const { data: productsData = {}, isLoading: isProductsLoading } =
    useGetAllProductsQuery(queryParams);
    console.log( "quary param",queryParams);

  // ✅ Fetch filters for ALL categories
  const { data: filtersData = {}, isLoading: isFiltersLoading } =
    useGetAllFiltersQuery("all");

    console.log("filter qury",filtersData);

  if (isProductsLoading || isFiltersLoading) return <Loading />;

  const backendFilters = filtersData?.data || {};
  const filters = {
    categories: ["all", ...(backendFilters.categories || [])],
    colors: ["all", ...(backendFilters.colors || [])],
    priceRanges: backendFilters.priceRanges || [],
  };

  const products = productsData?.data?.products || [];
  const totalPages = productsData?.data?.totalPages || 0;

  return (
    <section className="section__container">
      <h2 className="section__header">Shop All Products</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <ShopFiltering
          filters={filters}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
          clearFilters={() =>
            setFiltersState({ category: "all", color: "all", priceRange: "" })
          }
        />

        <div className="flex-1">
          <ProductCards products={products} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
