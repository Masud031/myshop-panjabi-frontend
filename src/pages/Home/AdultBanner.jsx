/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import adultImage from "../../assets/adultpanjabi.jpg"; // 👕 Replace with your actual image

const AdultBanner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Section heading */}
      <div className="text-center mt-16 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-wide">
          Adult Panjabi
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#92400e] to-[#f59e0b] mx-auto mt-2 rounded-full"></div>
      </div>

      <section
        className="relative overflow-hidden 
                   bg-gradient-to-r from-[#fdf6ec] via-[#fef3c7] to-[#fde68a]
                   min-h-[400px] md:min-h-[520px] flex flex-col md:flex-row-reverse
                   items-center justify-between px-6 md:px-16 py-10 md:py-14"
      >
        {/* Background subtle pattern */}
        <div className="absolute inset-0 bg-[url('/texture.png')] bg-cover bg-center opacity-10"></div>

        {/* Right Side: Image */}
        <div
          className={`w-full md:w-1/2 flex justify-center items-center transition-transform duration-1000 relative z-10 ${
            loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <img
            src={adultImage}
            alt="Adult Panjabi Collection"
            className="w-[250px] sm:w-[320px] md:w-[380px] object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Left Side: Text */}
        <div
          className={`w-full md:w-1/2 text-center md:text-left space-y-4 mt-8 md:mt-0 transition-all duration-1000 relative z-10 ${
            loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h4 className="text-[#78350f] font-medium text-sm md:text-base tracking-wide">
            CLASSIC TRADITION, MODERN STYLE
          </h4>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#111827] leading-tight">
            Elegant Adult Panjabi Collection
          </h1>

          <p className="text-[#4b5563] font-body text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Step into sophistication with our Adult Panjabi line — 
            crafted with premium fabrics, timeless embroidery, and 
            a blend of comfort and class that celebrates every occasion.
          </p>

          <div className="flex justify-center md:justify-start">
            <a
              href="/category/adult-panjabi"
              className="inline-block px-7 py-2.5 
                         bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#f59e0b] 
                         text-white font-semibold rounded-md 
                         shadow-lg transition-all duration-300 transform 
                         hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">SHOP NOW</span>
              <span className="absolute inset-0 bg-white opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdultBanner;
