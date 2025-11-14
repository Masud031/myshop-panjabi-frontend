/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import tallManImg from "../../assets/tallman.jpg"; // 🧍‍♂️ Replace with your actual image

const TallMenBanner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* 🔹 Heading Outside Section */}
      <div className="text-center mt-16 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-wide">
          Big-Size panjabi
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#7f1d1d] to-[#b45309] mx-auto mt-2 rounded-full"></div>
      </div>

      {/* 🔸 Banner Section */}
      <section
        className="relative overflow-hidden 
                   bg-gradient-to-r from-[#fdf3e7] via-[#fce1c6] to-[#f4b880]
                   min-h-[460px] md:min-h-[560px] flex flex-col md:flex-row 
                   items-center justify-between px-6 md:px-16 py-10 md:py-16"
      >
        {/* 🖼️ Left - Image */}
        <div
          className={`w-full md:w-1/2 flex justify-center md:justify-start items-center 
                      transition-all duration-700 ease-out
                      ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
        >
          <img
            src={tallManImg}
            alt="Taller Men Panjabi"
            loading="lazy"
            decoding="async"
            className="w-[260px] sm:w-[320px] md:w-[440px] rounded-2xl shadow-2xl 
                       object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* ✨ Right - Text */}
        <div
          className={`w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 z-10
                      transition-all duration-700 ease-out
                      ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
        >
          <div className="max-w-lg mx-auto md:mx-0 space-y-5">
            <div className="inline-block px-3 py-1 bg-[#fff]/20 text-[#5c1e00] font-medium rounded-full text-xs uppercase tracking-wide">
              For Taller Men
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#4a1a00] leading-tight">
              Premium Panjabi Collection for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7f1d1d] to-[#b45309]">
                46, 48 & 50 Sizes
              </span>
            </h3>

            <p className="text-[#4a1a00]/80 text-base sm:text-lg md:text-xl leading-relaxed">
              Crafted specially for taller men who appreciate elegance and
              perfect fit. Our <strong>46+, 48, and 50 size Panjabis</strong> feature
              extended lengths, relaxed shoulders, and fine fabric for both
              festive and formal occasions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center mt-3">
              <a
                href="/category/tall-panjabi"
                className="inline-block px-6 py-2.5 rounded-md 
                           bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#78350f]
                           text-white font-semibold shadow-md transition-transform 
                           duration-300 hover:scale-105 hover:shadow-lg"
              >
                Explore Now
              </a>

              <a
                href="/size-guide"
                className="inline-block px-5 py-2 rounded-md bg-white/60 
                           text-[#7f1d1d] font-medium hover:bg-white/80 transition"
              >
                View Size Guide
              </a>
            </div>

            <ul className="flex gap-3 flex-wrap text-sm text-[#6b2b05] mt-4">
              <li>✅ Extended sleeves</li>
              <li>✅ Elegant embroidery</li>
              <li>✅ Premium cotton blend</li>
            </ul>
          </div>
        </div>

        {/* 🪄 Soft Glow Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#fff8e1]/40 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#ffe1b0]/40 blur-3xl"></div>
        </div>
      </section>
    </>
  );
};

export default TallMenBanner;
