/* eslint-disable no-unused-vars */
import { useState } from 'react';
import ProductCards from '../Shop/productCards';
import { useFetchTrendingProductsQuery } from '../../redux/features/products/productsApi';

const TrandProducts = () => {
  const { data = [], isLoading, error } = useFetchTrendingProductsQuery();
  const [visibleProduct, setVisibleProduct] = useState(8);
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>failed to load trending products</p>;

  // ✅ filter based on search
  const filteredProducts = data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadmore = () => {
    setVisibleProduct((prev) => prev + 8);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Discover the hottest picks, elevate your style with joy
      </p>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search trending products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-md my-4"
      />

      {/* ✅ Show only filtered + paginated API products */}
      <div className="mt-8">
        <ProductCards products={filteredProducts.slice(0, visibleProduct)} />
      </div>

      {/* ✅ Load more button */}
      <div className="product__btn">
        {visibleProduct < filteredProducts.length && (
          <button onClick={handleLoadmore} className="btn">
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrandProducts;
