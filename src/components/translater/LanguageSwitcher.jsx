import  { useState } from "react";

const LanguageSwitcher = () => {
  const [checked, setChecked] = useState(false); // false = English (E)

  const handleChange = (e) => {
    const newValue = e.target.checked;
    setChecked(newValue);

    // Google Translate Switch
    const translateDropdown = document.querySelector(".goog-te-combo");
    if (translateDropdown) {
      translateDropdown.value = newValue ? "bn" : "en";
      translateDropdown.dispatchEvent(new Event("change"));
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
      />

      {/* Track = Always Gradient */}
      <div
        className="
          w-14 h-7 rounded-full
          bg-gradient-to-r from-red-600 to-yellow-400
          transition-all duration-300
        "
      ></div>

      {/* Sliding Circle */}
      <span
        className="
          absolute top-0 left-0 w-7 h-7 flex items-center justify-center
          bg-white text-[10px] font-bold rounded-full shadow-md
          transform transition-all duration-300
          peer-checked:translate-x-7
        "
      >
        {checked ? "B" : "E"}
      </span>
    </label>
  );
};

export default LanguageSwitcher;
