/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllFiltersQuery } from "../redux/features/products/productsApi";
import Loading from "./loading";
import { useTranslation } from "react-i18next";


export default function CategoriesBar() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
   const { t } = useTranslation(); 

  // Fetch categories from backend (using your hook)
  const { data, isLoading, isError } = useGetAllFiltersQuery( );

  // Get categories array safely
  const categories = data?.data?.categories || [];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-red-500 py-3">Failed to load categories</p>;

  return (
    <div className="relative border-b shadow-sm py-2 select-none bg-gradient-to-r from-red-800 to-yellow-400  ">

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow w-8 h-8 flex items-center justify-center hover:bg-gray-100 z-10"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Categories Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 px-12 md:px-16 scrollbar-hide scroll-smooth"
      >
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-[var(--primary-color-dark)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md capitalize"
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full shadow w-8 h-8 flex items-center justify-center hover:bg-gray-100 z-10"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
