import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

const FilterSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-64 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header for mobile */}
      <div
        className="flex items-center justify-between p-3 bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#f59e0b] text-white font-semibold cursor-pointer md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {/* Filters content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${isOpen ? "max-h-[1000px]" : "max-h-0"} md:max-h-none md:block`}
      >
        <div className="p-4 space-y-4 md:p-5">
          {/* Example Filter Group */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
            <ul className="space-y-1 text-gray-600">
              <li><label><input type="checkbox" className="mr-2" />Panjabi</label></li>
              <li><label><input type="checkbox" className="mr-2" />Shirt</label></li>
              <li><label><input type="checkbox" className="mr-2" />Kurta</label></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Price Range</h3>
            <input type="range" min="500" max="5000" className="w-full accent-red-500" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Color</h3>
            <ul className="flex flex-wrap gap-2">
              <li className="w-6 h-6 bg-red-500 rounded-full border border-gray-300 cursor-pointer"></li>
              <li className="w-6 h-6 bg-yellow-500 rounded-full border border-gray-300 cursor-pointer"></li>
              <li className="w-6 h-6 bg-green-500 rounded-full border border-gray-300 cursor-pointer"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
