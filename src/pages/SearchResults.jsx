/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { setFilters, clearFilters } from "../redux/features/products/productsSlice";

const SearchResults = ({searchQuery }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // works for ?query= or ?search=

  const dispatch = useDispatch();
  const { category, color, minPrice, maxPrice } = useSelector(
    (state) => state.products?.filters || {}
  );
  // Use prop `searchQuery` if provided, fallback to URL query
  const searchParamQuery = searchQuery || searchParams.get("query") || "";


  // ✅ Use unified query key "search" — backend handles both ?search or ?query
  const { data, isLoading, error } = useGetAllProductsQuery({
    search: searchParamQuery.trim(),
    category,
    color,
    minPrice,
    maxPrice,
    page: 1,
    limit: 20,
  });
  console.log("Final products array:", products.map(p => p.productCode));
  console.log("RTK Query Data:", data);
  console.log("RTK Query Error:", error);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">
        ❌ Error loading products: {error?.data?.message || "Unknown error"}
      </div>
    );
  }

  const products = data?.data?.products || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        Search Results for: <span className="text-primary">{searchParamQuery}</span>
      </h2>

      {/* 🔹 Filter Buttons Example */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(setFilters({ category: "dress" }))}
          className="px-3 py-1 border rounded hover:bg-primary-light"
        >
          Dresses
        </button>
        <button
          onClick={() => dispatch(setFilters({ color: "red" }))}
          className="px-3 py-1 border rounded hover:bg-primary-light"
        >
          Red
        </button>
        <button
          onClick={() => dispatch(clearFilters())}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Clear
        </button>
      </div>

      {/* 🔹 Product Results */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-sm p-3 hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-sm mt-2 font-medium">{product.name}</h3>
              <p className="text-gray-500 text-xs mb-1">
                Code: <span className="font-semibold">{product.productCode}</span>
              </p>
              <p className="text-gray-700 text-xs">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
