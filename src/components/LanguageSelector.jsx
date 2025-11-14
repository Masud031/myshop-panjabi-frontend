
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={handleLanguageChange}
      value={i18n.language}
      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring focus:ring-blue-100"
    >
      <option value="en">🇬🇧 English</option>
      <option value="bn">🇧🇩 বাংলা</option>
    </select>
  );
};

export default LanguageSelector;
