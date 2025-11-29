import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import category_1 from "../../assets/saro4.png";
import category_2 from "../../assets/category-2.jpg";
import category_3 from "../../assets/category-3.jpg";
import category_4 from "../../assets/category-4.jpg";

const ProductGrid = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 1, name: t("accessories"), path: "accessories", image: category_1 },
    { id: 2, name: "Dress Collection", path: "dress", image: category_2 },
    { id: 3, name: "Jewellery", path: "jewellery", image: category_3 },
    { id: 4, name: t("accessories"), path: "accessories", image: category_4 },
  ];

  return (
    <section className="full-bg-section">
      <div className="categories__grid">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/category/${cat.path}`} className="categories__card">
            <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
