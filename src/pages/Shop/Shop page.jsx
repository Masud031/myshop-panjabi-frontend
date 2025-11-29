/* eslint-disable react/prop-types */
import { useState } from "react";
import ProductCards from "../../../src/pages/Shop/productCards";
import ShopFiltering from "../../../src/pages/Shop/shopFiltering";
import MobileShopFiltering from "../../../src/pages/Shop/MobileShopFiltering";
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
    size: "",
  });

  const { category, color, priceRange, size } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const queryParams = {
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    size: size || "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: 24,
  };

  // ✅ Fetch all products
  const { data: productsData = {}, isLoading: isProductsLoading } =
    useGetAllProductsQuery(queryParams);

  // ✅ Fetch filters for ALL categories
  const { data: filtersData = {}, isLoading: isFiltersLoading } =
    useGetAllFiltersQuery("all");

  if (isProductsLoading || isFiltersLoading) return <Loading />;

  const backendFilters = filtersData?.data || {};
  const filters = {
    categories: ["all", ...(backendFilters.categories || [])],
    colors: ["all", ...(backendFilters.colors || [])],
    priceRanges: backendFilters.priceRanges || [],
    sizes: backendFilters.sizes || [],
  };

  // Prepare sizesMap for mobile filtering
  const categorySizeMap = {
    "kids-panjabi": [20, 22, 24, 26, 28, 30, 32, 34, 36],
    "panjabi": [38, 40, 42, 44, 46, "s","m","L","xl","xxl","xxxl"],
    "big-size": [46, 48, 50],
    "sheroany": [38,40,42,44,46],
    "trending": [38,40,42,44,46],
    "payjama": [38,40,42,44],
    "koti": [36,38,40,42,44,46],
     "kids-sheroany": [24,26,28,30,32,34,36],
   
  };

  const products = productsData?.data?.products || [];
  const totalPages = productsData?.data?.totalPages || 0;

  return (
    <section className="section__container">
      <h2 className="section__header">Shop All Products</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:flex">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={() =>
              setFiltersState({ category: "all", color: "all", priceRange: "", size: "" })
            }
          />
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden">
          <MobileShopFiltering
            filters={{
              ...filters,
              sizesMap: categorySizeMap, // pass category sizes map
            }}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
          />
        </div>

        {/* Products */}
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
