/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import ProductCards from '../Shop/productCards';
import { useFetchTrendingProductsQuery } from '../../redux/features/products/productsApi';

const TrandProducts = () => {
  const { data = [], isLoading, error } = useFetchTrendingProductsQuery();
  const [visibleProduct, setVisibleProduct] = useState(8);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load trending products</p>;

  const filteredProducts = data.slice(0, visibleProduct);

  const handleLoadmore = () => {
    setVisibleProduct((prev) => prev + 8);
  };

  return (
    <>
      {/* 🌟 Section Heading */}
      <div className="text-center mt-16 mb-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-wide">
          Trending Products
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#b91c1c] to-[#f59e0b] mx-auto mt-2 rounded-full"></div>

        {/* ✨ Social Icons with glow */}
        <div className="flex justify-center gap-6 mt-4 text-2xl relative z-10">
          <div className="relative group">
            <span className="absolute inset-0 rounded-full bg-[#1877F2] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="relative text-[#1877F2] hover:scale-110 transition-transform duration-300">
              <FaFacebook />
            </a>
          </div>

          <div className="relative group">
            <span className="absolute inset-0 rounded-full bg-[#E1306C] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="relative text-[#E1306C] hover:scale-110 transition-transform duration-300">
              <FaInstagram />
            </a>
          </div>

          <div className="relative group">
            <span className="absolute inset-0 rounded-full bg-[#010101] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></span>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="relative text-[#010101] hover:scale-110 transition-transform duration-300">
              <FaTiktok />
            </a>
          </div>

          <div className="relative group">
            <span className="absolute inset-0 rounded-full bg-[#FF0000] blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></span>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="relative text-[#FF0000] hover:scale-110 transition-transform duration-300">
              <FaYoutube />
            </a>
          </div>
        </div>

        <p className="text-gray-600 text-sm md:text-base mt-3">
          Trends inspired by what’s viral on social — stay stylish & fresh!
        </p>
      </div>

      {/* 🌈 Main Trending Section */}
      <section className="bg-gradient-to-r from-[#ef4444] via-[#f87171] to-[#fcd34d] py-12 px-4">
        <div className="mt-8">
          <ProductCards products={filteredProducts} />
        </div>

        {/* 🔗 Explore More */}
        <div className="flex justify-center mt-8">
          <a
            href="/category/trending"
            className="inline-block px-7 py-2.5 
              bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#78350f] 
              text-white rounded-md font-semibold 
              transition-all duration-300 transform 
              hover:scale-105 hover:shadow-lg hover:brightness-110"
          >
            EXPLORE MORE
          </a>
        </div>

        {/* ⬇ Load More */}
        {visibleProduct < data.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadmore}
              className="px-5 py-2.5 bg-white text-[#b91c1c] font-medium rounded-md shadow-md border border-[#b91c1c] transition-transform hover:scale-105 hover:bg-[#fff7ed]"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* 💫 Keyframes for subtle floating glow */}
      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        .group:hover span {
          animation: pulseGlow 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default TrandProducts;
