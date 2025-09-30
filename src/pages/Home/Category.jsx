import { Link } from "react-router-dom";
import category_1 from '../../assets/saro4.png';
import category_2 from '../../assets/category-2.jpg';
import category_3 from '../../assets/category-3.jpg';
import category_4 from '../../assets/category-4.jpg';

const ProductGrid = () => {
  const categories = [
    { id: 1, name: "Accessories", path: "accessories", image: category_1 },
    { id: 2, name: "Dress Collection", path: "dress", image: category_2 },
    { id: 3, name: "Jewellery", path: "jewellery", image: category_3 },
    { id: 4, name: "Accessories", path: "accessories", image: category_4 },
  ];

  return (
    <section className="product__grid">
      {categories.map((category) => (
        <Link className="categories__card"
          key={category.id}
          to={`/category/${category.path}`}
        
        >
          <img 
            src={category.image} 
            alt={category.name} 
            // className="w-full h-40 object-cover rounded-t-lg" 
          />
          <h2>
            {category.name}
          </h2>
        </Link>
      ))}
    </section>
  );
};

export default ProductGrid;
