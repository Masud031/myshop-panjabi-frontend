/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import header__image from '../../assets/saro1.png';

const Banner = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true); // Trigger animation on mount
  }, []);

  return (
    <section className="bg-primary-light min-h-[650px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-16 py-12">
      
      {/* Text Content */}
      <div className="text-center md:text-left max-w-lg mx-auto md:mx-0 space-y-4">
        <h4
          className={`text-primary font-medium text-sm md:text-base transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          UP TO 20% DISCOUNT ON
        </h4>
        <h1
          className={`text-3xl sm:text-4xl md:text-6xl font-heading font-extrabold text-text-dark transition-all duration-1000 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Men's Panjabi Collection
        </h1>
        <p
          className={`text-text-light font-body text-base sm:text-lg md:text-xl transition-opacity duration-1000 delay-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Discover the latest trends and express your unique style with our
          Men’s Panjabi collection. Explore curated traditional outfits
          blending Bengali and Arabic culture.
        </p>
        
        <a
          href="/shop"
          className="inline-block px-6 py-3 bg-primary text-white rounded-md font-medium transition transform hover:bg-primary-dark hover:scale-105"
        >
          EXPLORE NOW
        </a>
      </div>

      {/* Image */}
      <div className="flex justify-center md:justify-end mt-8 md:mt-0 overflow-hidden">
        <img
          src={header__image}
          alt="Banner"
          className={`w-full max-w-xs sm:max-w-sm md:max-w-md object-cover rounded-lg shadow-lg transition-transform duration-1000 ${
            loaded ? 'scale-100' : 'scale-95'
          }`}
        />
      </div>
      
    </section>
  );
};

export default Banner;
