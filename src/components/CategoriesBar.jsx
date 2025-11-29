/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllFiltersQuery } from "../redux/features/products/productsApi";
import Loading from "./loading";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function CategoriesBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showMore, setShowMore] = useState(false);

  const { data, isLoading, isError } = useGetAllFiltersQuery();
  const categories = data?.data?.categories || [];

  const mainCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(4);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
    setShowMore(false);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500 py-3">Failed to load categories</p>;

  return (
    <div className="relative py-2 px-3 flex items-center gap-2 bg-gradient-to-r from-red-800 to-yellow-400 select-none">

      {/* FIRST 4 CATEGORIES — COMPACT */}
      <div className="flex items-center gap-2 overflow-hidden">
        {mainCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="px-3 py-1 rounded-full text-xs md:text-sm bg-white shadow-sm hover:bg-gray-200 capitalize whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MORE BUTTON */}
      {moreCategories.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-3 py-1 rounded-full text-xs md:text-sm bg-white shadow-sm hover:bg-gray-200 flex items-center gap-1 whitespace-nowrap"
          >
            More
            <ChevronDown size={14} />
          </button>

          {/* SMALL DROPDOWN — CORNER ONLY */}
          {showMore && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2 w-20 z-20">
              {moreCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 capitalize text-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
