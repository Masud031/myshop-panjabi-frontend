/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import header__image from '../../assets/saro1.png';

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true); // Trigger animation on mount
  }, []);

  return (
  <section className="bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#f59e0b] 
min-h-[420px] md:min-h-[520px] grid grid-cols-1 md:grid-cols-2 gap-6 items-center 
px-5 sm:px-10 md:px-16 py-10 md:py-14 text-white">

  {/* Text Content */}
  <div className="text-center md:text-left max-w-lg mx-auto md:mx-0 space-y-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
    
    <h4
      className={`text-[#fff3e0] font-medium text-sm md:text-base tracking-wide uppercase transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Up to 20% Discount On
    </h4>

    <h1
      className={`text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight 
      text-[#fffdf8] transition-all duration-1000 transform ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      Men's Panjabi Collection
    </h1>

    <p
      className={`text-[#fffaf2] font-body text-sm sm:text-base md:text-lg leading-relaxed transition-opacity duration-1000 delay-200 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Discover the latest trends and express your unique style with our Men’s Panjabi collection. 
      Explore curated traditional outfits blending Bengali and Arabic culture.
    </p>

<a
  href="/shop"
  className="inline-block px-6 py-2.5 
  bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#f59e0b] 
  text-white rounded-md font-medium 
  transition-all duration-300 transform 
  hover:scale-105 hover:shadow-lg"
>
  EXPLORE NOW
</a>
  </div>

  {/* Image */}
  <div className="flex justify-center md:justify-end mt-6 md:mt-0 overflow-hidden">
    <img
      src={header__image}
      alt="Banner"
      className={`w-full max-w-[250px] sm:max-w-[320px] md:max-w-[380px] object-cover 
      rounded-lg shadow-xl transition-transform duration-1000 ${
        loaded ? 'scale-100' : 'scale-95'
      }`}
    />
  </div>

</section>

  );
};

export default Banner;
