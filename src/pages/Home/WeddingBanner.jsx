/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import weddingImage from "../../assets/wedding.png"; // replace with your image

const WeddingBanner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🌙 Section Heading */}
      <div className="text-center mt-16 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-wide">
          Wedding Panjabi
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#7f1d1d] to-[#f59e0b] mx-auto mt-2 rounded-full"></div>
      </div>

      {/* 💫 Banner Section */}
      <section
        className="relative overflow-hidden 
                   bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#f59e0b]
                   min-h-[450px] md:min-h-[560px] flex flex-col md:flex-row
                   items-center justify-between px-6 md:px-16 py-10 md:py-16"
      >
        {/* ✨ Background Elements (Removed icons cleanly) */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none"></div>

        {/* 💍 Left Side - Text */}
        <div
          className={`w-full md:w-1/2 space-y-4 text-center md:text-left relative z-10 transition-all duration-1000 ${
            loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h4 className="text-[#fde68a] text-sm md:text-base tracking-wider font-medium uppercase drop-shadow">
            Exclusive Wedding Collection
          </h4>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight drop-shadow-lg">
            Celebrate Your Special Day in Style
          </h1>

          <p className="text-[#fef3c7] font-body text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Discover our premium Wedding Panjabi Collection — elegant designs,
            royal fabrics, and timeless craftsmanship to make your big day truly
            memorable.
          </p>

          <div className="flex justify-center md:justify-start">
            <a
              href="/category/wedding-panjabi"
              className="inline-block px-7 py-2.5 
                         bg-gradient-to-r from-[#78350f] via-[#b45309] to-[#f59e0b]
                         text-white font-semibold rounded-md shadow-lg 
                         hover:scale-105 hover:shadow-2xl transition-all duration-300 
                         relative overflow-hidden group"
            >
              <span className="relative z-10">EXPLORE WEDDING LOOKS</span>
              <span className="absolute inset-0 bg-white opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </a>
          </div>
        </div>

        {/* 🧵 Right Side - Image */}
        <div
          className={`w-full md:w-1/2 flex justify-center items-center relative z-10 transition-transform duration-1000 ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <img
            src={weddingImage}
            alt="Wedding Panjabi Collection"
            className="w-[260px] sm:w-[340px] md:w-[420px] object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>
    </>
  );
};

export default WeddingBanner;
