/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import kidsImage from "../../assets/kidsp2.jpeg"; // 🧸 replace with your image path

const KidsBanner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    
<>
    {/* Section heading separated from previous section */}
      <div className="text-center mt-12 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-wide">
          Kids-Panjabi
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#b91c1c] to-[#f59e0b] mx-auto mt-2 rounded-full" />
      </div>

      {/* Banner Section */}
    
    
 <section
  className="relative overflow-hidden 
             bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#f59e0b]
             min-h-[400px] md:min-h-[520px] flex flex-col md:flex-row 
             items-center justify-between px-6 md:px-16 py-10 md:py-14"
>
  {/* 🎈 Background Balloon Images */}
  <div className="absolute inset-0 overflow-hidden">
    <img
      src="/balloon2.png"
      alt="balloon"
      className="absolute w-20 md:w-28 left-10 top-20 animate-float-slow opacity-40"
    />
    <img
      src="/balloon2.png"
      alt="balloon"
      className="absolute w-16 md:w-24 right-10 bottom-10 animate-float-medium opacity-30"
    />
    <img
      src="/balloon2.png"
      alt="balloon"
      className="absolute w-24 md:w-32 left-[40%] top-[60%] animate-float-fast opacity-35"
    />
  </div>

  {/* Left Side: Image */}
  <div
    className={`w-full md:w-1/2 flex justify-center items-center transition-transform duration-1000 relative z-10 ${
      loaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
    }`}
  >
    <img
      src={kidsImage}
      alt="Kids Panjabi Collection"
      className="w-[250px] sm:w-[320px] md:w-[380px] object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Right Side: Text */}
  <div
    className={`w-full md:w-1/2 text-center md:text-left space-y-4 mt-8 md:mt-0 transition-all duration-1000 relative z-10 ${
      loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
    }`}
  >
    <h4 className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow">
      NEW ARRIVALS FOR KIDS
    </h4>

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight drop-shadow-lg">
      Kids Panjabi Collection
    </h1>

    <p className="text-[#fde68a] font-body text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
      Style meets comfort in our Kids Panjabi collection.  
      Bright colors, soft fabrics, and modern traditional patterns —  
      perfect for every festive moment.
    </p>

    <div className="flex justify-center md:justify-start">
      <a
        href="/category/kids-panjabi"
        className="inline-block px-7 py-2.5 
                   bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#78350f] 
                   text-white font-semibold rounded-md 
                   shadow-lg transition-all duration-300 transform 
                   hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
      >
        <span className="relative z-10">SHOP NOW</span>
        <span className="absolute inset-0 bg-white opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
      </a>
    </div>
  </div>

  {/* 🎈 Balloon Animation Keyframes */}
  <style jsx>{`
    @keyframes float {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(2deg);
      }
      100% {
        transform: translateY(0) rotate(-2deg);
      }
    }

    .animate-float-slow {
      animation: float 9s ease-in-out infinite;
    }
    .animate-float-medium {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-fast {
      animation: float 4s ease-in-out infinite;
    }
  `}</style>
</section>
</>




  );
};

export default KidsBanner;
