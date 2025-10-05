import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { setFilters, clearFilters } from "../redux/features/products/productsSlice";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const dispatch = useDispatch();
  const { category, color, minPrice, maxPrice } = useSelector(
    (state) => state.products.filters
  );
console.log('Category:', category);
console.log('Color:', color);

  const { data, isLoading,error } = useGetAllProductsQuery({
    search: query,
    category,
    color,
    minPrice,
    maxPrice,
    page: 1,
    limit: 20,
  });
    console.log("RTK Query Data:", data);
  console.log("RTK Query Error:", error);

  if (isLoading) return <Loading />;

   if (error) {
     // If you see this, it means the API call failed (4xx, 5xx, or network)
     return <div className="text-red-600">Error loading products: {JSON.stringify(error)}</div>;
  }

  // const { products = [] } = data?.data || {};
  // const products = data?.data?.products || [];
  const products = data?.data?.products || []; 

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">
        Search Results for: <span className="text-primary">{query}</span>
      </h2>

      {/* Example filter buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(setFilters({ category: "dress" }))}
          className="px-3 py-1 border rounded"
        >
          Dresses
        </button>
        <button
          onClick={() => dispatch(setFilters({ color: "red" }))}
          className="px-3 py-1 border rounded"
        >
          Red
        </button>
        <button
          onClick={() => dispatch(clearFilters())}
          className="px-3 py-1 border rounded bg-gray-100"
        >
          Clear
        </button>
      </div>

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
              <p className="text-gray-600 text-xs">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
